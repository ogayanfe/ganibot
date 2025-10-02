import Link from "next/link";
import React from "react";

interface IconLinkPropType extends React.ComponentProps<typeof Link> {
  label: string;
  children: React.ReactNode;
}

export default function IconLink(props: IconLinkPropType) {
  const { label, children } = props;
  return (
    <Link {...props}>
      <span className="w-0 overflow-hidden fixed -left-[100000rem]">{label}</span>
      <span className="text-3xl shadow-lg">{children}</span>
    </Link>
  );
}
