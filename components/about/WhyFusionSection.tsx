import Image from "next/image";
import aboutImg3 from "@/assets/aboutImg3.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "../global/Container";

function WhyFusionSection() {
  return (
    <div className="py-4 bg-primary-20 dark:bg-primary-80">
      <Container className="max-md:space-y-8 md:grid md:grid-cols-2 md:gap-4">
        <div className="relative aspect-square max-h-[420px] w-full">
          <Image
            src={aboutImg3}
            alt="Why FusionFootwear image"
            fill
            priority
            className="object-cover"
          ></Image>
        </div>
        <div className=" px-4 flex items-center justify-center">
          <div className="space-y-4">
            <h2 className="text-present-2 text-primary">Why FusionFootwear?</h2>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="space-y-4">
                  <h4 className="text-present-3 font-semibold">
                    Design That Delivers:
                  </h4>
                  <p>
                    Whether you’re dressing for work, travel, or weekend
                    exploration, our curated collections include sneakers,
                    boots, loafers, and sandals—each thoughtfully constructed to
                    look as good as it feels.
                  </p>
                  <h4 className="text-present-3 font-semibold">
                    Responsive Customer Care:
                  </h4>
                  <p>
                    Need help with sizing? Have a question about care
                    instructions? Our dedicated support team is always ready to
                    help. We treat every customer interaction as an opportunity
                    to improve.
                  </p>
                </CarouselItem>
                <CarouselItem className="space-y-4">
                  <h4 className="lg:text-present-2 text-present-3 font-semibold">
                    Fit for Real Life:
                  </h4>
                  <p>
                    We conduct extensive wear tests with everyday adventurers,
                    office professionals, and fitness enthusiasts to refine fit
                    profiles that accommodate a variety of foot shapes and
                    lifestyles.
                  </p>
                  <h4 className="lg:text-present-2 text-present-3 font-semibold">
                    Value & Transparency:
                  </h4>
                  <p>
                    We believe in honest pricing. You’ll find exactly where your
                    shoes are made, what materials they contain, and why they
                    cost what they do. No hidden markups—just straightforward
                    value.
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
export default WhyFusionSection;
