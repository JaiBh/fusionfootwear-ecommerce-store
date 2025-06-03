import Image from "next/image";
import aboutImg2 from "@/assets/aboutImg2.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "../global/Container";

function ValuesSection() {
  return (
    <div className="py-4">
      <Container className="max-md:space-y-8 md:grid md:grid-cols-2 md:gap-4">
        <div className="order-2 relative aspect-square max-h-[420px] w-full">
          <Image
            src={aboutImg2}
            alt="Our values image"
            fill
            priority
            className="object-cover"
          ></Image>
        </div>
        <div className=" px-4 flex items-center justify-center">
          <div className="space-y-4">
            <h2 className="text-present-2 text-primary">Our Values</h2>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="space-y-4">
                  <h4 className="text-present-3 font-semibold">Authenticity</h4>
                  <p>
                    We design products that reflect real life—versatile,
                    adaptable, and made to last.
                  </p>
                  <h4 className="text-present-3 font-semibold">Quality</h4>
                  <p>
                    From the highest-grade full-grain leathers to
                    precision-stitched seams, every component undergoes rigorous
                    quality checks. We stand behind our products with a warranty
                    and repair program that extends the life of your favorite
                    shoes.
                  </p>
                </CarouselItem>
                <CarouselItem className="space-y-4">
                  <h4 className="lg:text-present-2 text-present-3 font-semibold">
                    Innovation
                  </h4>
                  <p>
                    We research and test new materials and techniques
                    constantly, ensuring that every pair evolves with the latest
                    in comfort technology.
                  </p>
                  <h4 className="lg:text-present-2 text-present-3 font-semibold">
                    Community
                  </h4>
                  <p>
                    FusionFootwear is built by people, for people—our customers,
                    our team, and our partners. We believe in transparent
                    communication, genuine feedback, and creating a culture of
                    inclusivity.
                  </p>
                </CarouselItem>
              </CarouselContent>
              <div className="flex items-center justify-between mt-6">
                <CarouselPrevious className="static" />
                <CarouselNext className="static" />
              </div>
            </Carousel>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default ValuesSection;
