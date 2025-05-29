import Image from "next/image";
import logo from "@/public/favicon.ico";

function Logo() {
  return <Image src={logo} priority width={32} height={32} alt="Logo"></Image>;
}
export default Logo;
