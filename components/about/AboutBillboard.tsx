import aboutUsHero from "@/assets/aboutUsHero.jpg";
import Image from "next/image";

function AboutBillboard() {
  return (
    <section className="relative aspect-[6_/_7] max-h-[80vh] w-full bg-black">
      <Image
        src={aboutUsHero}
        alt="About page hero"
        priority
        fill
        className="object-cover opacity-70"
      ></Image>
      <h1 className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-2xl font-bold md:text-present-1 text-white px-6 bg-black/60 py-2 text-center">
        Fusing <span className="text-primary">Style</span>, Comfort &
        Conscience.
      </h1>
    </section>
  );
}
export default AboutBillboard;
