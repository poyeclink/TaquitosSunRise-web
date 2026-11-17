"use client";

import Image from "next/image";
import { startTransition, useActionState, useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import {
  CONTACT_LIMITS,
  validateContactMessage,
  type ContactErrors,
  type ContactField,
  type ContactTopic,
} from "@/core/domain/contact/contact-message";
import { errorText, formCopy } from "@/presentation/components/contact/contact-content";
import styles from "@/presentation/components/contact/contact.module.css";
import homeStyles from "@/presentation/components/home/home.module.css";
import motion from "@/presentation/components/motion/motion.module.css";
import { Magnetic } from "@/presentation/components/motion/pointer-fx";
import { TodoNote } from "@/presentation/components/todo-note";

/** Estado que devuelve la Server Action (la define la ruta y la pasa por props). */
export interface ContactFormState {
  readonly status: "idle" | "sent" | "invalid" | "unavailable";
  readonly errors?: ContactErrors;
}

export type ContactFormAction = (state: ContactFormState, formData: FormData) => Promise<ContactFormState>;

/**
 * Evento para preparar el formulario desde otra sección (p. ej. el planificador de catering):
 * elige el motivo y, si viene, escribe un borrador del mensaje.
 */
export const PREFILL_EVENT = "contact:prefill";
export interface PrefillDetail {
  readonly topic: ContactTopic;
  readonly message?: string;
}

/** Ángulos de las chispas del botón al enviar. */
const BURST = [0, 45, 90, 135, 180, 225, 270, 315];

const EMPTY = { name: "", reply: "", message: "" };
const INITIAL: ContactFormState = { status: "idle" };

export function ContactForm({ action }: { action: ContactFormAction }) {
  const [state, formAction, pending] = useActionState(action, INITIAL);
  const [fields, setFields] = useState(EMPTY);
  const [topic, setTopic] = useState<ContactTopic>("general");
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  /** Resultado ya cerrado con "Enviar otro mensaje". */
  const [dismissed, setDismissed] = useState<ContactFormState | null>(null);
  /** Cambia en cada envío válido para repetir el destello del botón. */
  const [burst, setBurst] = useState(0);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const baseId = useId();

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { topic: next, message } = (event as CustomEvent<PrefillDetail>).detail;
      if (formCopy.topics.some((t) => t.value === next)) setTopic(next);
      if (message) {
        setFields((prev) => ({ ...prev, message }));
        setTouched((prev) => ({ ...prev, message: true }));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  // Validación en vivo con las mismas reglas que el servidor (dominio).
  const check = validateContactMessage({ ...fields, topic });
  const clientErrors: ContactErrors = check.ok ? {} : check.errors;
  const serverErrors = state.status === "invalid" ? (state.errors ?? {}) : {};
  const errorFor = (field: ContactField) => {
    const code = touched[field] || attempted ? (clientErrors[field] ?? serverErrors[field]) : undefined;
    return code ? errorText[field][code] : undefined;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (!check.ok) {
      const first = Object.keys(check.errors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const data = new FormData(event.currentTarget);
    setBurst((value) => value + 1);
    startTransition(() => formAction(data));
  };

  /** Agrega una frase al mensaje y deja el cursor al final para seguir escribiendo. */
  const addStarter = (starter: string) => {
    setFields((prev) => {
      const current = prev.message.trimEnd();
      return { ...prev, message: current ? `${current} ${starter}` : starter };
    });
    requestAnimationFrame(() => {
      const el = messageRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  const reset = () => {
    setDismissed(state);
    setFields(EMPTY);
    setTouched({});
    setAttempted(false);
  };

  const set = (field: keyof typeof EMPTY) => (event: { target: { value: string } }) =>
    setFields((prev) => ({ ...prev, [field]: event.target.value }));
  const blur = (field: ContactField) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  if (state.status === "sent" && state !== dismissed) {
    return (
      <div role="status" className={`${motion.enter} flex flex-col items-center gap-5 py-10 text-center sm:py-14`}>
        <Image src={formCopy.success.lettering.src} alt={formCopy.success.lettering.alt} className="h-auto w-56 -rotate-3 sm:w-64" />
        <h3 className="text-3xl font-bold sm:text-4xl">{formCopy.success.title}</h3>
        <p className="max-w-sm text-lg leading-relaxed">{formCopy.success.text}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 rounded-full border-2 border-charcoal/20 px-6 py-3 font-bold transition hover:border-crimson hover:text-crimson"
        >
          {formCopy.success.again}
        </button>
      </div>
    );
  }

  const topicIndex = formCopy.topics.findIndex((t) => t.value === topic);
  const messageLength = fields.message.trim().length;
  const isValid = (field: keyof typeof EMPTY) => fields[field].trim() !== "" && !clientErrors[field];
  const tracked = ["name", "reply", "message"] as const;
  const done = tracked.filter(isValid).length;
  const ready = done === tracked.length;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/* Trampa para bots: invisible para personas y lectores de pantalla. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          No llenar
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-charcoal/80">{formCopy.labels.topic}</legend>
        <div
          className="relative grid rounded-[1.25rem] bg-charcoal/[0.05] p-1.5 sm:rounded-full"
          style={{ gridTemplateColumns: `repeat(${formCopy.topics.length}, minmax(0, 1fr))` }}
        >
          {/* Pastilla que se desliza bajo el motivo elegido. */}
          <span
            aria-hidden
            className="absolute inset-y-1.5 left-1.5 rounded-[1rem] bg-crimson shadow-lg shadow-crimson/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:rounded-full"
            style={{
              width: `calc((100% - 0.75rem) / ${formCopy.topics.length})`,
              transform: `translateX(${topicIndex * 100}%)`,
            }}
          />
          {formCopy.topics.map((option) => {
            const on = option.value === topic;
            return (
              <label
                key={option.value}
                className={`relative z-10 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[1rem] px-2 py-2.5 text-center text-sm font-bold transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-aqua sm:flex-row sm:gap-2 sm:rounded-full sm:text-base ${
                  on ? "text-white" : "text-charcoal hover:text-crimson"
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={option.value}
                  checked={on}
                  onChange={() => setTopic(option.value)}
                  className="sr-only"
                />
                <span className={`grid size-7 place-items-center rounded-full transition-colors ${on ? "bg-white" : ""}`}>
                  <Image src={option.icon} alt="" className="h-auto w-5" />
                </span>
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-7 sm:grid-cols-2 sm:gap-5">
        <Field
          id={`${baseId}-name`}
          name="name"
          label={formCopy.labels.name}
          autoComplete="name"
          value={fields.name}
          onChange={set("name")}
          onBlur={blur("name")}
          error={errorFor("name")}
          valid={isValid("name")}
          maxLength={CONTACT_LIMITS.name.max}
        />
        <Field
          id={`${baseId}-reply`}
          name="reply"
          label={formCopy.labels.reply}
          hint={formCopy.labels.replyHint}
          autoComplete="email"
          value={fields.reply}
          onChange={set("reply")}
          onBlur={blur("reply")}
          error={errorFor("reply")}
          valid={isValid("reply")}
        />
      </div>

      <div>
        <Field
          id={`${baseId}-message`}
          name="message"
          label={formCopy.labels.message}
          multiline
          inputRef={messageRef}
          value={fields.message}
          onChange={set("message")}
          onBlur={blur("message")}
          error={errorFor("message")}
          valid={isValid("message")}
          maxLength={CONTACT_LIMITS.message.max}
          counter={`${messageLength} / ${CONTACT_LIMITS.message.max}`}
        />
        {/* Frases rápidas: cambian con el motivo y entran una tras otra. */}
        <div role="group" aria-label={formCopy.startersLabel} className="mt-1 flex flex-wrap items-center gap-2">
          <span aria-hidden className="mr-1 text-xs font-bold uppercase tracking-[0.2em] text-charcoal/70">
            {formCopy.startersLabel}
          </span>
          {formCopy.starters[topic].map((starter, index) => (
            <button
              key={`${topic}-${starter}`}
              type="button"
              onClick={() => addStarter(starter)}
              className={`${motion.enter} rounded-full border border-dashed border-charcoal/30 px-3.5 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-crimson hover:bg-crimson/[0.06] hover:text-crimson`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              + {starter}
            </button>
          ))}
        </div>
      </div>

      {/* Progreso: el sol avanza a medida que el mensaje queda listo. */}
      <div
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
        style={{ "--progress": done / tracked.length } as CSSProperties}
      >
        <div aria-hidden className="relative mx-4 h-1.5 rounded-full bg-charcoal/10 sm:flex-1">
          <span className={`${styles.progressFill} absolute inset-0 rounded-full bg-crimson`} />
          <span
            className={`${styles.progressSun} absolute top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md shadow-charcoal/25 ring-1 ring-charcoal/10`}
          >
            <Image src={formCopy.progress.icon} alt="" className={`h-auto w-5 ${ready ? styles.ready : ""}`} />
          </span>
        </div>
        <p aria-live="polite" className={`shrink-0 text-sm font-bold sm:w-40 sm:text-right ${ready ? "text-crimson" : "text-charcoal/75"}`}>
          {ready ? formCopy.progress.ready : formCopy.progress.label(done, tracked.length)}
        </p>
      </div>

      {state.status === "unavailable" && state !== dismissed && (
        <div role="alert" className={`${motion.enter} flex gap-4 rounded-[1.5rem] border-2 border-dashed border-crimson/40 bg-crimson/[0.04] p-5`}>
          <span aria-hidden className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-crimson text-lg font-bold text-white">
            !
          </span>
          <div>
            <p className="font-bold text-crimson">{formCopy.unavailable.title}</p>
            <p className="mt-1 leading-relaxed">{formCopy.unavailable.text}</p>
            <p className="mt-2 text-sm">
              <TodoNote>{formCopy.unavailable.todo}</TodoNote>
            </p>
          </div>
        </div>
      )}

      <Magnetic className="relative self-start">
      <button
        type="submit"
        disabled={pending}
        className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-crimson px-9 py-4 text-lg font-bold text-white shadow-lg shadow-crimson/30 transition hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-80"
      >
        {/* Brillo que cruza el botón al pasar el cursor. */}
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-[left] duration-700 ease-out group-hover:left-[120%]"
        />
        {pending ? (
          <>
            <span aria-hidden className="size-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white" />
            {formCopy.sending}
          </>
        ) : (
          <>
            {formCopy.submit}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </>
        )}
      </button>
      {/* Chispas al enviar, fuera del botón para que no las recorte (se reinician con `key`). */}
      {burst > 0 && (
        <span key={burst} aria-hidden className={`${homeStyles.burst} ${styles.sparks}`}>
          {BURST.map((angle) => (
            <span key={angle} style={{ "--a": `${angle}deg` } as CSSProperties} />
          ))}
        </span>
      )}
      </Magnetic>
    </form>
  );
}

/** Campo con etiqueta flotante: dentro del campo cuando está vacío, arriba al escribir o enfocar. */
function Field({
  id,
  name,
  label,
  hint,
  error,
  valid = false,
  counter,
  multiline = false,
  inputRef,
  ...input
}: {
  id: string;
  name: ContactField;
  label: string;
  hint?: string;
  error?: string;
  valid?: boolean;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  counter?: string;
  multiline?: boolean;
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  onBlur: () => void;
  autoComplete?: string;
  maxLength?: number;
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  const control = `peer block w-full rounded-[1.25rem] border-2 bg-white px-5 pb-3 pt-7 text-lg text-charcoal outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:shadow-[0_0_0_4px] focus:shadow-aqua/25 ${
    error ? "border-crimson" : "border-charcoal/15 hover:border-charcoal/30 focus:border-aqua"
  }`;
  const shared = { id, name, placeholder: " ", "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, ...input };

  return (
    <div>
      <div className="relative">
        {multiline ? (
          <textarea ref={inputRef} rows={5} className={`${control} resize-y`} {...shared} />
        ) : (
          <input type="text" className={`${control} pr-12`} {...shared} />
        )}
        {/* Palomita cuando el campo está bien. */}
        {valid && !error && (
          <span
            aria-hidden
            className={`${motion.enter} absolute right-4 top-4 grid size-6 place-items-center rounded-full bg-aqua text-sm font-bold text-white`}
          >
            ✓
          </span>
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-5 top-2 text-xs font-bold uppercase tracking-[0.15em] text-charcoal/70 transition-all duration-200 peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-lg peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:text-charcoal"
        >
          {label}
        </label>
        {counter && (
          <span aria-hidden className="pointer-events-none absolute bottom-3 right-5 text-xs font-bold tabular-nums text-charcoal/60">
            {counter}
          </span>
        )}
      </div>
      <div className="mt-2 min-h-5 px-1 text-sm">
        {error ? (
          <p id={`${id}-error`} className={`${motion.enter} font-bold text-crimson`}>
            {error}
          </p>
        ) : (
          hint && (
            <p id={`${id}-hint`} className="text-charcoal/75">
              {hint}
            </p>
          )
        )}
      </div>
    </div>
  );
}
