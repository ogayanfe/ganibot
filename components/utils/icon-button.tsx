import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

interface IconButtonPropType extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  label: string;
  children: React.ReactNode;
}

export default function IconButton(props: IconButtonPropType) {
  const { label, children } = props;
  return (
    <button {...props}>
      <span className="w-0 overflow-hidden fixed -left-[100000rem]">{label}</span>
      <span className="shadow-lg">{children}</span>
    </button>
  );
}
