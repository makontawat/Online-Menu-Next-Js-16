import { create } from "zustand";

export type CartItem = {
  menuId: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  qty: number;
};

type CartState = {
  items: CartItem[];

  // derived
  totalQty: number;
  totalPrice: number;

  // actions
  addItem: (item: Omit<CartItem, "qty">) => void;
  increase: (menuId: string) => void;
  decrease: (menuId: string) => void;
  remove: (menuId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQty: 0,
  totalPrice: 0,

  addItem: (item) => {
    const items = [...get().items];
    const existing = items.find((i) => i.menuId === item.menuId);

    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...item, qty: 1 });
    }

    set({
      items,
      totalQty: items.reduce((s, i) => s + i.qty, 0),
      totalPrice: items.reduce((s, i) => s + i.qty * i.price, 0),
    });
  },

  increase: (menuId) => {
    const items = get().items.map((i) =>
      i.menuId === menuId ? { ...i, qty: i.qty + 1 } : i,
    );

    set({
      items,
      totalQty: items.reduce((s, i) => s + i.qty, 0),
      totalPrice: items.reduce((s, i) => s + i.qty * i.price, 0),
    });
  },

  decrease: (menuId) => {
    const items = get()
      .items.map((i) => (i.menuId === menuId ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0);

    set({
      items,
      totalQty: items.reduce((s, i) => s + i.qty, 0),
      totalPrice: items.reduce((s, i) => s + i.qty * i.price, 0),
    });
  },

  remove: (menuId) => {
    const items = get().items.filter((i) => i.menuId !== menuId);

    set({
      items,
      totalQty: items.reduce((s, i) => s + i.qty, 0),
      totalPrice: items.reduce((s, i) => s + i.qty * i.price, 0),
    });
  },

  clear: () => set({ items: [], totalQty: 0, totalPrice: 0 }),
}));
