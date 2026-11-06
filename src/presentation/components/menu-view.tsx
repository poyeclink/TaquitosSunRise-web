import type { Menu } from "@/core/domain/menu/menu";
import { formatMoney } from "@/presentation/format/money";
import { TodoNote } from "@/presentation/components/todo-note";

export function MenuView({ menu }: { menu: Menu }) {
  if (menu.categories.length === 0) {
    return (
      <p>
        <TodoNote>el menú y los precios se cargarán desde Toast POS.</TodoNote>
      </p>
    );
  }

  return (
    <div className="grid gap-12">
      {menu.categories.map((category) => (
        <section key={category.id} aria-labelledby={`cat-${category.id}`}>
          <h2 id={`cat-${category.id}`} className="mb-2">
            {category.name}
          </h2>
          {category.description && <p className="mb-4">{category.description}</p>}
          <ul className="divide-y divide-charcoal/20">
            {category.items.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-4 py-4">
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                </div>
                <span className="text-lg font-bold text-crimson">{formatMoney(item.price)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
