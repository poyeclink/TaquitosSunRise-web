/**
 * Marca visible para datos del negocio que el cliente aún no entrega (regla 4 de AGENTS.md).
 * Buscar `TodoNote` en el código antes de salir a producción.
 */
export function TodoNote({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-dashed border-current px-2 py-0.5 font-bold">
      TODO: {children}
    </span>
  );
}
