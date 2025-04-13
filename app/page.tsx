"use client";

import Image from "next/image";
import mobileMensHero from "@/assets/mobileMensHero.jpg";
import tabletMensHero from "@/assets/tabletMensHero.jpg";
import desktopMensHero from "@/assets/desktopMensHero.jpg";
import mobileWomensHero from "@/assets/mobileWomensHero.jpg";
import tabletWomensHero from "@/assets/tabletWomensHero.jpg";
import desktopWomensHero from "@/assets/desktopWomensHero.jpg";

import Link from "next/link";
import { useDepartmentAtom } from "@/features/department/store/useDepartmentAtom";

function page() {
  const [department, setDepartment] = useDepartmentAtom();

  return (
    <section className="h-screen grid max-lg:grid-rows-2 lg:grid-cols-2">
      <Link
        href={"/mens"}
        className="relative group overflow-hidden"
        onClick={() => setDepartment({ department: "Male" })}
      >
        <h1 className="text-present-1 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white transition group-hover:scale-[1.2] z-40">
          Men's
        </h1>
        <Image
          src={mobileMensHero}
          fill
          priority
          alt="Men wearing sneakers"
          className="md:hidden opacity-80 group-hover:scale-[1.2] transition object-cover"
        ></Image>
        <Image
          src={tabletMensHero}
          fill
          priority
          alt="Men wearing sneakers"
          className="max-md:hidden lg:hidden opacity-80 group-hover:scale-[1.2] transition object-cover"
        ></Image>
        <Image
          src={desktopMensHero}
          fill
          priority
          alt="Men wearing sneakers"
          className="max-lg:hidden opacity-80 group-hover:scale-[1.2] transition object-cover"
        ></Image>
      </Link>
      <Link
        href={"/womens"}
        className="relative group overflow-hidden"
        onClick={() => setDepartment({ department: "Female" })}
      >
        <h1 className="text-present-1 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white transition group-hover:scale-[1.2] z-40">
          Women's
        </h1>
        <Image
          src={mobileWomensHero}
          fill
          priority
          alt="Men wearing sneakers"
          className="md:hidden opacity-80 group-hover:scale-[1.2] transition object-cover"
        ></Image>
        <Image
          src={tabletWomensHero}
          fill
          priority
          alt="Men wearing sneakers"
          className="max-md:hidden lg:hidden opacity-80 group-hover:scale-[1.2] transition object-cover"
        ></Image>
        <Image
          src={desktopWomensHero}
          fill
          priority
          alt="Men wearing sneakers"
          className="max-lg:hidden opacity-80 group-hover:scale-[1.2] transition object-cover"
        ></Image>
      </Link>
    </section>
  );
}
export default page;
