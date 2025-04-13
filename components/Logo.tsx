import Image from "next/image";
import logo from "@/assets/logo.svg";

function Logo() {
  return <Image src={logo} priority width={32} height={32} alt="Logo"></Image>;
}
export default Logo;
