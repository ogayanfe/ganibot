import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
}

export default function HeaderButton({ title, icon, ...props }: IProps) {
  return (
    <button
      {...props}
      className="p-2 px-2.5 sm:text-blue-50 flex items-center text-blue justify-center gap-3 sm:bg-blue-500 rounded-md sm:shadow-md uppercase"
    >
      <span className="max-sm:text-3xl">{icon}</span>
      <span className="max-sm:hidden">{title}</span>
    </button>
  );
}
