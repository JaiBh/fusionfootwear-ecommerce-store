import getCategory from "@/actions/getCategory";
import Image from "next/image";
import backupBillboard from "@/assets/backup_billboard.jpg";
import BreadCrumbTemplate from "@/components/global/BreadCrumbTemplate";
import ProductsList from "@/components/productsPage/ProductsList";
import MobileTabletFilters from "@/components/productsPage/mobileTabletFilters/MobileTabletFilters";
import DesktopFilters from "@/components/productsPage/desktopFilters/DesktopFilters";
import { Category } from "@/types";
import ErrorMessage from "@/components/productPage/ErrorMessage";

async function CategoryPage({
  params,
}: {
  params: Promise<{ department: "mens" | "womens"; categoryId: string }>;
}) {
  const { categoryId, department } = await params;
  let category: Category | undefined = undefined;

  try {
    const resp = await getCategory({ categoryId, isArchived: false });
    category = resp;
  } catch {}

  if (!category) {
    return (
      <ErrorMessage message="Seems like this category does not exist"></ErrorMessage>
    );
  }
  const navigationLinks = [
    { text: "Home", href: `/${department}` },
    { text: category.name, href: `/${department}/${categoryId}` },
  ];
  return (
    <>
      <BreadCrumbTemplate links={navigationLinks}></BreadCrumbTemplate>
      <div className="lg:grid gap-6 items-start grid-cols-[13fr_37fr] lg:w-[90vw] lg:max-w-[1315px] lg:mx-auto pb-8 lg:pb-12">
        <div className="max-lg:hidden">
          <DesktopFilters
            showColorsFilter={true}
            showSortBy={true}
            showPriceFilter={true}
            showSizeFilter={true}
          ></DesktopFilters>
        </div>
        <div className="grid gap-2 lg:gap-4">
          {/* Billboard */}
          <section className="relative max-h-[40vh] aspect-[13_/_7] w-full bg-grey-900">
            <div className="absolute top-0 left-0 w-full h-full bg-grey-900/30 z-10 flex items-center justify-center">
              <h1 className="text-present-1 text-white">{category.name}</h1>
            </div>
            <Image
              src={
                department === "mens"
                  ? category.billboardMale?.imageUrl || backupBillboard
                  : category.billboardFemale?.imageUrl || backupBillboard
              }
              priority
              alt={`${category.name} category billboard`}
              className="object-cover"
              fill
            ></Image>
          </section>
          {/* Mobile/Tablet Filters */}
          <section className="grid grid-cols-2 md:grid-cols-4 lg:hidden max-lg:w-[90vw] max-lg:max-w-[1315px] max-lg:mx-auto max-lg:mb-4">
            <MobileTabletFilters
              showColorsFilter={true}
              showPriceFilter={true}
              showSizeFilter={true}
              showSortBy={true}
            ></MobileTabletFilters>
          </section>
          {/* Products */}
          <section className="max-lg:w-[90vw] max-lg:max-w-[1315px] max-lg:mx-auto">
            <ProductsList
              categoryId={categoryId}
              department={department === "mens" ? "Male" : "Female"}
            ></ProductsList>
          </section>
        </div>
      </div>
    </>
  );
}
export default CategoryPage;
