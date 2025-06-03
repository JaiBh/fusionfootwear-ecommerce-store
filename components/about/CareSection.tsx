import Image from "next/image";
import aboutImg4 from "@/assets/aboutImg4.jpg";
import Container from "../global/Container";

function CareSection() {
  return (
    <div className="py-4">
      <Container className="max-md:space-y-8 md:grid md:grid-cols-2 md:gap-4">
        <div className="order-2 relative aspect-square max-h-[420px] w-full">
          <Image
            src={aboutImg4}
            alt="Why FusionFootwear image"
            fill
            priority
            className="object-cover"
          ></Image>
        </div>
        <div className=" px-4 flex items-center justify-center">
          <div className="space-y-4">
            <h2 className="text-present-2 text-primary">Care & Repair</h2>
            <p>
              We understand that a great pair of shoes is an investment. That’s
              why we offer a comprehensive care guide—detailing how to clean,
              condition, and store your FusionFootwear—and a repair service for
              worn soles or scuffed uppers. With our “Renew & Return” program,
              you can send back eligible pairs for professional resoling or
              refurbishment at a discount. We believe in reducing waste and
              extending the lifecycle of every shoe we create.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default CareSection;
