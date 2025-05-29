import getProducts from "@/actions/getProducts";
import homeHero from "@/assets/homeHero.jpg";
import homeMensButtonImage from "@/assets/homeMensButtonImage.jpg";
import homeWomensButtonImage from "@/assets/homeWomensButtonImage.jpg";
import FeaturedProducts from "@/components/departmentPage/FeaturedProducts";
import Container from "@/components/global/Container";
import Footer from "@/components/global/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function page() {
  return (
    <>
      <nav className="bg-card">
        <Container className="flex items-center justify-between py-3">
          <Button
            variant={"default"}
            asChild
            className="w-26 bg-primary-80 hover:bg-primary-60"
          >
            <Link href={"/mens"}>Men</Link>
          </Button>
          <h2 className="text-present-2 text-center">
            Welcome to <span className="text-primary">FusionFootwear</span>
          </h2>
          <Button
            variant={"default"}
            asChild
            className="w-26 bg-primary-80 hover:bg-primary-60"
          >
            <Link href={"/womens"}>Women</Link>
          </Button>
        </Container>
      </nav>
      <section className="relative aspect-[16_/_10] w-screen max-h-[70vh] bg-black flex items-center justify-center">
        <Image
          src={homeHero}
          fill
          priority
          alt="Home Hero"
          className="object-cover opacity-60"
        ></Image>
        <div className="w-[50%] max-w-[720px] bg-card/80 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 md:p-8 rounded-3xl md:space-y-4">
          <h1 className="text-present-3-bold md:text-present-2 lg:text-present-1 text-center">
            This is <span className="text-primary">FusionFootwear</span>
          </h1>
          <h3 className="text-present-4 lg:text-present-3 !font-semibold text-center max-md:hidden">
            Where <span className="text-primary">Performance</span> meets{" "}
            <span className="text-primary">Style</span>
          </h3>
        </div>
      </section>
      <Container className="pt-12 pb-8 md:py-16 space-y-12">
        <div className="grid gap-4 md:grid-cols-2 md:gap-4">
          <Link
            href={"/mens"}
            className="relative aspect-[2_/_1] bg-black rounded-2xl overflow-hidden group"
          >
            <Image
              src={homeMensButtonImage}
              fill
              alt="Man wearing shoes"
              className="object-cover opacity-50 group-hover:opacity-80 transition"
            ></Image>
            <h3 className="text-present-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white group-hover:scale-120 transition">
              Men
            </h3>
          </Link>
          <Link
            href={"/womens"}
            className="relative aspect-[2_/_1] bg-black rounded-2xl overflow-hidden group"
          >
            <Image
              src={homeWomensButtonImage}
              fill
              alt="Woman wearing shoes"
              className="object-cover opacity-50 group-hover:opacity-80 transition"
            ></Image>
            <h3 className="text-present-2 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white group-hover:scale-120 transition">
              Women
            </h3>
          </Link>
        </div>
        <FeaturedProducts></FeaturedProducts>
      </Container>
      <Footer></Footer>
    </>
  );
}
export default page;
