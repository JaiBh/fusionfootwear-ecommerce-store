import Link from "next/link";

interface SidebarLinkProps {
  text: string;
  href: string;
  onClick: () => void;
}

function SidebarLink({ text, href, onClick }: SidebarLinkProps) {
  return (
    <Link href={href} onClick={onClick}>
      <li className="py-6 px-4 rounded bg-primary-20 text-present-4-bold hover:opacity-80 dark:bg-primary">
        {text}
      </li>
    </Link>
  );
}
export default SidebarLink;
