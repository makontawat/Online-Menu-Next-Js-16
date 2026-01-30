// menu/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function MenuPage() {
  const menus = await fetchQuery(api.menu.getMenu);

  return (
    <div>
      {menus.map((menu) => (
        <div key={menu._id}>{menu.name}</div>
      ))}
    </div>
  );
}
