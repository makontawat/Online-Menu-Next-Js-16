"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

type Menu = {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
};

export function AddToCartControl({ menu }: { menu: Menu }) {
  const item = useCartStore((s) => s.items.find((i) => i.menuId === menu._id));
  const addItem = useCartStore((s) => s.addItem);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);

  // 👉 ยังไม่เคย add
  if (!item) {
    return (
      <Button
        size="sm"
        className="h-8 w-8 rounded-full"
        onClick={() =>
          addItem({
            menuId: menu._id,
            name: menu.name,
            price: menu.price,
            imageUrl: menu.imageUrl,
          })
        }
      >
        +
      </Button>
    );
  }

  // 👉 มีของแล้ว
  return (
    <div className="flex items-center gap-2 bg-muted rounded-full px-2 h-8">
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6"
        onClick={() => decrease(menu._id)}
      >
        −
      </Button>

      <span className="min-w-[20px] text-center text-sm font-medium">
        {item.qty}
      </span>

      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6"
        onClick={() => increase(menu._id)}
      >
        +
      </Button>
    </div>
  );
}
