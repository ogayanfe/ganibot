import cn from "@/utils/cn";
import ComponentVisiblity from "../utils/component-visibility";
import Link from "next/link";

interface IProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  iconPosition?: "start" | "end";
  href?: string;
  onClick?: () => unknown;
}

export default function HeaderButton({ title, icon, className, iconPosition = "start", href, ...props }: IProps) {
  return (
    <Link
      href={href || "#"}
      className={cn(
        `p-2 px-3 flex items-center text-blue justify-center font-semibold gap-3 
        rounded-md sm:shadow-md uppercase`,
        className
      )}
      {...props}
    >
      <ComponentVisiblity show={iconPosition === "start"}>
        <span>{icon}</span>
      </ComponentVisiblity>
      <span>{title}</span>
      <ComponentVisiblity show={iconPosition === "end"}>
        <span>{icon}</span>
      </ComponentVisiblity>
    </Link>
  );
}
