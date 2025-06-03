import Image from "next/image";
import aboutImg1 from "@/assets/aboutImg1.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "../global/Container";

function MissionSection() {
  return (
    <div className="bg-primary-80 py-4">
      <Container className="max-md:space-y-8 md:grid md:grid-cols-2 md:gap-4">
        <div className="relative aspect-square max-h-[420px] w-full">
          <Image
            src={aboutImg1}
            alt="Our mission image"
            fill
            priority
            className="object-cover"
          ></Image>
        </div>
        <div className=" px-4 flex items-center justify-center">
          <div className="space-y-4">
            <h2 className="text-present-2 text-primary dark:text-primary">
              Our Mission
            </h2>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="space-y-4">
                  <h4 className="lg:text-present-2 text-present-3 font-semibold">
                    Style without Compromise
                  </h4>
                  <p>
                    We believe you shouldn’t have to sacrifice elegance for
                    comfort. That’s why each collection features sleek profiles,
                    thoughtful colorways, and modern details—whether it’s a
                    minimal leather sneaker, a rugged hiking boot, or a
                    versatile loafer. We aim to be the go-to brand for anyone
                    who values looking sharp on the outside and feeling great on
                    the inside.
                  </p>
                </CarouselItem>
                <CarouselItem className="space-y-4">
                  <h4 className="lg:text-present-2 text-present-3 font-semibold">
                    Innovation in Comfort
                  </h4>
                  <p>
                    Under the surface of every design is a dedication to
                    cutting-edge foot science. From ergonomic insoles with
                    adaptive cushioning to breathable, moisture-wicking linings,
                    we obsess over the small details that make your walk—and
                    your day—more enjoyable. We partner with specialized
                    factories that use advanced techniques like seamless heel
                    counters, arch-support engineering, and lightweight yet
                    resilient outsoles. The result? Footwear that supports you
                    from sunrise hikes to city commutes without skipping a beat.
                  </p>
                </CarouselItem>
                <CarouselItem className="space-y-4">
                  <h4 className="lg:text-present-2 text-present-3 font-semibold">
                    Conscious Craftsmanship
                  </h4>
                  <p>
                    Sustainability isn’t a buzzword for us—it’s fundamental to
                    how we operate. We source premium leathers from tanneries
                    with responsible water management practices, use recycled
                    textiles for select linings, and explore cruelty-free and
                    vegan alternatives whenever possible. Our packaging is
                    designed to minimize waste: biodegradable tissue paper,
                    soy-based inks, and boxes made from recycled cardboard. By
                    choosing FusionFootwear, you’re stepping into a more
                    sustainable future—one comfortable step at a time.
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
export default MissionSection;
