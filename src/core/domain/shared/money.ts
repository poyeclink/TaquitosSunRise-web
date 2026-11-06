/**
 * Dinero representado en centavos (entero) para evitar errores de punto flotante.
 * Toast entrega precios como decimales; el adaptador de infraestructura los convierte.
 */
export type Currency = "USD";

export interface Money {
  readonly amountInCents: number;
  readonly currency: Currency;
}

export class InvalidMoneyError extends Error {
  constructor(amountInCents: number) {
    super(`Monto inválido: ${amountInCents}. Debe ser un entero de centavos >= 0.`);
    this.name = "InvalidMoneyError";
  }
}

export function createMoney(amountInCents: number, currency: Currency = "USD"): Money {
  if (!Number.isInteger(amountInCents) || amountInCents < 0) {
    throw new InvalidMoneyError(amountInCents);
  }
  return Object.freeze({ amountInCents, currency });
}
