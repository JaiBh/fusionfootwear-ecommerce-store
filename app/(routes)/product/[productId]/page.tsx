import getProduct from "@/actions/getProduct";
import getProductLine from "@/actions/getProductLine";
import getSizes from "@/actions/getSizes";
import ErrorMessage from "@/components/productPage/ErrorMessage";
import ProductBreadCrumb from "@/components/productPage/ProductBreadCrumb";
import ProductGallery from "@/components/productPage/ProductGallery";
import ProductInfo from "@/components/productPage/ProductInfo";

async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  try {
    const { productId } = await params;
    const product = await getProduct({ productId, isArchived: false });

    if (!product || !product.images || product.images.length < 1) {
      <ErrorMessage message="Oops, looks like this product does not exist."></ErrorMessage>;
    }

    const productLine = product.productLineId
      ? await getProductLine({
          productLineId: product.productLineId,
        })
      : null;
    const sizes = await getSizes({});

    return (
      <>
        <ProductBreadCrumb product={product}></ProductBreadCrumb>
        <section className="grid md:grid-cols-[52fr_48fr] gap-8 pb-8 lg:pb-12 md:w-[95vw] md:mx-auto md:max-w-[992px] items-start">
          <ProductGallery product={product}></ProductGallery>
          <ProductInfo
            product={product}
            sizes={sizes}
            productLine={productLine}
          ></ProductInfo>
        </section>
      </>
    );
  } catch (err) {
    console.log("Failed to load product page", err);
    return (
      <ErrorMessage
        message={"Something went wrong while loading this page."}
      ></ErrorMessage>
    );
  }
}
export default ProductPage;
