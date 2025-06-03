import DesktopFilters from "@/components/productsPage/desktopFilters/DesktopFilters";
import MobileTabletFilters from "@/components/productsPage/mobileTabletFilters/MobileTabletFilters";
import ProductsList from "@/components/productsPage/ProductsList";
import SearchBillboard from "@/components/searchPage/SearchBillboard";

function SearchPage() {
  return (
    <div className="lg:grid gap-6 grid-cols-[13fr_37fr] items-start lg:w-[90vw] lg:max-w-[1315px] lg:mx-auto py-8 lg:py-12">
      <div className="max-lg:hidden">
        <DesktopFilters
          showColorsFilter={true}
          showDepartmentFilter={true}
          showPriceFilter={true}
          showSizeFilter={true}
          showSortBy={true}
        ></DesktopFilters>
      </div>
      <div className="grid gap-2 lg:gap-4">
        {/* Billboard */}
        <SearchBillboard></SearchBillboard>
        {/* Mobile/Tablet Filters */}
        <section className="max-lg:mb-4">
          <MobileTabletFilters
            showColorsFilter={true}
            showDepartmentFilter={true}
            showPriceFilter={true}
            showSizeFilter={true}
            showSortBy={true}
          ></MobileTabletFilters>
        </section>
        {/* Products */}
        <section className="max-lg:w-[90vw] max-lg:max-w-[1315px] max-lg:mx-auto">
          <ProductsList searchEnabled={true}></ProductsList>
        </section>
      </div>
    </div>
  );
}
export default SearchPage;
