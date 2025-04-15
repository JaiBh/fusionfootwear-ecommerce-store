import getCategory from "@/actions/getCategory";
import Image from "next/image";
import backupBillboard from "@/assets/backup_billboard.jpg";

async function page({
  params,
}: {
  params: Promise<{ categoryId: string; department: string }>;
}) {
  const { categoryId, department } = await params;
  const category = await getCategory(categoryId);
  return (
    <>
      <div className="relative max-h-[40vh] aspect-[13_/_7] w-full bg-grey-900">
        <Image
          src={
            department === "mens"
              ? category.billboardMale?.imageUrl || backupBillboard
              : category.billboardFemale?.imageUrl || backupBillboard
          }
          priority
          alt="Billboard"
          className="object-cover opacity-70"
          fill
        ></Image>
      </div>
    </>
  );
}
export default page;
