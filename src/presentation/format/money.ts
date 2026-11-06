import type { Money } from "@/core/domain/shared/money";

const formatters = new Map<string, Intl.NumberFormat>();

export function formatMoney({ amountInCents, currency }: Money): string {
  let formatter = formatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", { style: "currency", currency });
    formatters.set(currency, formatter);
  }
  return formatter.format(amountInCents / 100);
}
