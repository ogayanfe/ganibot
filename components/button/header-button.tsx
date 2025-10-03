import cn from "@/utils/cn";
import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import ComponentVisiblity from "../utils/component-visibility";

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export default function HeaderButton({ title, icon, className, iconPosition = "start", ...props }: IProps) {
  return (
    <button
      className={cn(`p-2 px-3 flex items-center text-blue justify-center font-semibold gap-3 rounded-md sm:shadow-md uppercase`, className)}
      {...props}
    >
      <ComponentVisiblity show={iconPosition === "start"}>
        <span className="">{icon}</span>
      </ComponentVisiblity>
      <span>{title}</span>
      <ComponentVisiblity show={iconPosition === "end"}>
        <span className="">{icon}</span>
      </ComponentVisiblity>
    </button>
  );
}
