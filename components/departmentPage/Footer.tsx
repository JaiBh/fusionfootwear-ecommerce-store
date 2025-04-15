import Link from "next/link";
import Logo from "../Logo";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      {/* Mobile Footer */}
      <div className="md:hidden flex items-center justify-between">
        <p className="text-present-5">&copy;{year} FusionFootwear</p>
        <div className="flex items-center gap-3 text-present-5">
          <Link href={"/contact"} className="transition hover:text-primary">
            Contact us
          </Link>
          /
          <Link href={"/about"} className="transition hover:text-primary">
            About us
          </Link>
          /
          <Link href={"/faqs"} className="transition hover:text-primary">
            FAQs
          </Link>
        </div>
      </div>

      {/* Tablet/Desktop Footer */}
      <div className="max-md:hidden flex items-center justify-between">
        <div className="space-y-4 max-w-[220px]">
          <div className="flex items-center gap-2">
            <Logo></Logo>
            <h2 className="text-present-2 text-primary">FusionFootwear</h2>
          </div>
          <p className="text-present-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever.Since the 1500s, when an unknown printer.
          </p>
        </div>
        <div className="space-y-4 max-w-[220px]">
          <h2 className="text-present-2">Follow Us</h2>
          <p className="text-present-5">
            Since the 1500s, when an unknown printer took a galley of type and
            scrambled.
          </p>
          <div className="flex items-center gap-4 text-primary">
            <Link href={"https://www.facebook.com/"}>
              <FaFacebook></FaFacebook>
            </Link>
            <Link href={"https://x.com/"}>
              <FaTwitter></FaTwitter>
            </Link>
            <Link href={"https://www.instagram.com/"}>
              <FaInstagram></FaInstagram>
            </Link>
          </div>
        </div>
        <div className="space-y-4 max-w-[220px]">
          <Link
            href={"/contact"}
            className="text-present-2 transition hover:text-primary"
          >
            Contact Us
          </Link>
          <p className="text-present-5">
            E-Comm , 4578<br></br>
            Marmora Road,<br></br>
            Glasgow D04 89GR
          </p>
        </div>
      </div>
    </>
  );
}
export default Footer;
