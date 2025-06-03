import Image from "next/image";
import aboutImg5 from "@/assets/aboutImg5.jpg";
import Container from "../global/Container";
import { Button } from "../ui/button";
import RouteLink from "../global/RouteLink";

function JoinFamily() {
  return (
    <div className="py-4">
      <Container className="max-md:space-y-8 md:grid md:grid-cols-2 md:gap-4">
        <div className="relative aspect-square max-h-[420px] w-full">
          <Image
            src={aboutImg5}
            alt="Our mission image"
            fill
            priority
            className="object-cover"
          ></Image>
        </div>
        <div className=" px-4 flex items-center justify-center">
          <div className="space-y-4">
            <h2 className="text-present-2 text-primary dark:text-primary">
              Join the FusionFootwear Family
            </h2>
            <p>
              Thank you for taking the time to learn about FusionFootwear. We’re
              proud of our roots and even more excited about where we’re
              headed—bringing innovative design and conscious craftsmanship to
              feet around the globe. Whether you’re a first-time visitor or one
              of our most loyal customers, we invite you to connect with us:
            </p>
            <ul className="list-disc space-y-3 list-inside">
              <li>
                <span className="font-semibold">
                  Follow us on Instagram & TikTok:{" "}
                </span>
                @FusionFootwear
              </li>
              <li>
                <span className="font-semibold">Reach out: </span>
                Have a question or feedback? Contact our support team at{" "}
                <a
                  href="mailto:support@fusionfootwear.com"
                  className="text-primary-60 font-semibold underline hover:text-primary-80"
                >
                  support@fusionfootwear.com
                </a>
                .
              </li>
            </ul>
            <Button asChild className="w-full mt-3">
              <RouteLink href="/">Start Shopping Now</RouteLink>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default JoinFamily;
