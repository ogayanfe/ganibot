import cn from "@/utils/cn";
import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import ComponentVisiblity from "../utils/component-visibility";
import Link from "next/link";

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  href?: string | ""; // use href instead of ref
}

export default function HeaderButton({
  title,
  icon,
  className,
  iconPosition = "start",
  href,
  ...props
}: IProps) {
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
