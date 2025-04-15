import Container from "@/components/Container";
import mensBillboard from "@/assets/mensHomeBillboard.jpg";
import womensBillboard from "@/assets/womensHomeBillboard.jpg";
import getProducts from "@/actions/getProducts";
import Image from "next/image";
import FeaturedProducts from "@/components/departmentPage/FeaturedProducts";
import ProductAd from "@/components/departmentPage/ProductAd";
import HomeInfo from "@/components/departmentPage/HomeInfo";
import LatestNews from "@/components/departmentPage/LatestNews";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/departmentPage/Footer";

interface PageProps {
  params: Promise<{ department: "mens" | "womens" }>;
}

async function page({ params }: PageProps) {
  const { department } = await params;
  const products = await getProducts(department === "mens" ? "Male" : "Female");
  const featuredProducts = products
    .filter((product) => product.isFeatured)
    .filter((product) => !product.isArchived);

  const categoriesWithFeaturedProducts: string[] = [];
  featuredProducts.forEach((product) => {
    if (categoriesWithFeaturedProducts.includes(product.category.name)) {
      return;
    } else {
      categoriesWithFeaturedProducts.push(product.category.name);
    }
  });
  return (
    <>
      <div className="max-h-[60vh] aspect-[16_/_10] lg:aspect-[16_/_7] w-screen bg-black">
        <Image
          src={department === "mens" ? mensBillboard : womensBillboard}
          priority
          alt="Billboard"
          className="object-cover w-[100vw] h-full opacity-50"
        ></Image>
      </div>
      <Container>
        <section className="py-8 lg:py-12">
          <FeaturedProducts
            products={featuredProducts}
            categories={["All", ...categoriesWithFeaturedProducts]}
          ></FeaturedProducts>
        </section>
        <Separator></Separator>
        <section className="py-8 lg:py-12">
          <ProductAd productId="07c52f03-398e-4785-a2ba-e150b7b4f000"></ProductAd>
        </section>
        <Separator></Separator>

        <section className="py-8 lg:py-12">
          <HomeInfo></HomeInfo>
        </section>
        <Separator></Separator>

        <section className="py-8 lg:py-12">
          <LatestNews></LatestNews>
        </section>
      </Container>
      <footer className="py-6 md:py-12 lg:py-16 bg-primary-20 dark:bg-secondary">
        <Container>
          <Footer></Footer>
        </Container>
      </footer>
    </>
  );
}
export default page;
