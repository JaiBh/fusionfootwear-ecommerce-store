import Container from "@/components/global/Container";
import SavedProducts from "@/components/saved/SavedProducts";

function SavedProductsPage() {
  return (
    <Container>
      <h1 className="text-present-2 md:text-present-1 text-center my-6 md:my-10">
        Saved Items
      </h1>
      <SavedProducts></SavedProducts>
    </Container>
  );
}
export default SavedProductsPage;
