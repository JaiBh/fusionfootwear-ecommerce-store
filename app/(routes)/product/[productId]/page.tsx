import getProduct from "@/actions/getProduct";

async function page({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProduct(productId);
  return <div>{product.name}</div>;
}
export default page;
