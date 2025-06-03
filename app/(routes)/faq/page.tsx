import Container from "@/components/global/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FaqPage() {
  return (
    <Container className="mb-8">
      <h2 className="text-present-2 md:text-present-2 my-6 md:my-8 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="max-w-[720px] mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            We offer a 30-day return window from the date of delivery. Items
            must be unworn and in original packaging.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping within the UK takes 2–5 business days. Express
            options are also available at checkout.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How can I track my order?</AccordionTrigger>
          <AccordionContent>
            Once your order is shipped, you’ll receive an email with tracking
            details. You can also track your order anytime through the “Orders”
            section in your account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What sizes do you offer?</AccordionTrigger>
          <AccordionContent>
            We stock most styles in sizes 3–13.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            I checked out as a guest. How do I manage my order?
          </AccordionTrigger>
          <AccordionContent>
            You can track or return your guest order by using the email
            confirmation link we sent you after purchase.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Can I cancel or change my order?</AccordionTrigger>
          <AccordionContent>
            If your order hasn’t shipped yet, we can make changes.{" "}
            <a
              href="/contact"
              className="text-primary-60 font-semibold underline hover:text-primary-80"
            >
              Contact us
            </a>{" "}
            as soon as possible.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
export default FaqPage;
