import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCartControl } from "@/components/web/AddToCartControl";
import { CartBar } from "@/components/web/CartBar";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function MenuPage({ params }: Props) {
  const { slug } = await params;

  const data = await fetchQuery(api.menu.getMenuBySlug, {
    slug: slug,
  });

  if (!data) {
    notFound();
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Image src="/no-food.svg" alt="No Food" width={150} height={150} />
        <p className="text-muted-foreground">
          ขออภัย ไม่พบเมนูที่คุณกำลังตามหา
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-6">
        {data?.map((menu) => (
          <Card
            key={menu._id}
            className="overflow-hidden border-none shadow-sm hover:shadow-lg transition-shadow pt-0 pb-0"
          >
            <div className="flex flex-row h-32 sm:h-40">
              <div className="relative w-32 sm:w-40 h-full shrink-0">
                <Image
                  src={
                    menu.imageUrl ??
                    "https://cdn.pixabay.com/photo/2025/11/11/05/51/05-51-57-137_640.jpg"
                  }
                  alt={menu.name}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
              <div className="flex flex-col justify-between p-3 sm:p-4 flex-1 min-w-0  ml-2">
                <div className="space-y-1">
                  <h2 className="text-lg sm:text-xl font-bold leading-tight truncate">
                    {menu.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {menu.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-base sm:text-lg font-bold text-primary">
                    ฿{menu.price}
                  </span>
                  <AddToCartControl menu={menu} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <CartBar />
    </>
  );
}
