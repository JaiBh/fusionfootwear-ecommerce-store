import RouteLink from "../global/RouteLink";

interface SidebarLinkProps {
  text: string;
  href: string;
  onClick: () => void;
  setOpen: (value: boolean) => void;
}

function SidebarLink({ text, href, onClick, setOpen }: SidebarLinkProps) {
  return (
    <RouteLink
      href={href}
      onClick={() => {
        onClick();
        setOpen(false);
      }}
    >
      <li className="text-start py-6 px-4 rounded bg-primary-20 text-present-4-bold hover:opacity-80 dark:bg-primary">
        {text}
      </li>
    </RouteLink>
  );
}
export default SidebarLink;
