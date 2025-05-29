import Container from "@/components/global/Container";
import mensBillboard from "@/assets/mensHomeBillboard.jpg";
import womensBillboard from "@/assets/womensHomeBillboard.jpg";
import Image from "next/image";
import FeaturedProducts from "@/components/departmentPage/FeaturedProducts";
import ProductAd from "@/components/departmentPage/ProductAd";
import HomeInfo from "@/components/departmentPage/HomeInfo";
import LatestNews from "@/components/departmentPage/LatestNews";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{ department: "mens" | "womens" }>;
}

async function page({ params }: PageProps) {
  const { department } = await params;

  return (
    <>
      <div className="max-h-[60vh] aspect-[16_/_10] lg:aspect-[16_/_7] w-full bg-black">
        <Image
          src={department === "mens" ? mensBillboard : womensBillboard}
          priority
          alt={`${department === "mens" ? "Menswear" : "Womenswear"} department billboard`}
          className="object-cover w-[100vw] h-full opacity-50"
        ></Image>
      </div>
      <Container>
        <section className="py-8 lg:py-12">
          <FeaturedProducts filterDepartment={true}></FeaturedProducts>
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
    </>
  );
}
export default page;
