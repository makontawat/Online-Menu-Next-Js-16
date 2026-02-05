import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Image src="/no-food.svg" alt="No Food" width={150} height={150} />
      <p className="text-muted-foreground">ขออภัย ไม่พบเมนูที่คุณกำลังตามหา</p>
    </div>
  );
}
