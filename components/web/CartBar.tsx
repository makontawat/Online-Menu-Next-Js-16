"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { AddToCartControl } from "./AddToCartControl";

export function CartBar() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) return null;

  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-0 left-4 right-4 z-50 h-14 rounded-none mb-4">
          <Button className="w-full flex justify-between h-12 text-lg font-bold rounded-xl">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span>{totalQty} รายการ</span>
            </div>
            <span>฿{totalPrice.toLocaleString()}</span>
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[80vh] rounded-t-[20px]">
        <SheetHeader>
          <SheetTitle className="text-xl">สรุปรายการอาหาร</SheetTitle>
          <SheetDescription>
            ตรวจสอบรายการอาหารและจำนวนก่อนยืนยันคำสั่งซื้อ
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 overflow-y-auto h-full pb-20 px-4">
          {items.map((item) => (
            <div
              key={item.menuId}
              className="flex justify-between items-center py-4 border-b gap-4"
            >
              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-muted-foreground">฿{item.price}</p>
              </div>

              <AddToCartControl
                menu={{
                  _id: item.menuId,
                  name: item.name,
                  price: item.price,
                  imageUrl: item.imageUrl,
                }}
              />

              <p className="font-bold w-20 text-right">
                ฿{(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          ))}
          <Button className="w-full mt-6 h-12 text-lg">
            ไปที่หน้าชำระเงิน
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
