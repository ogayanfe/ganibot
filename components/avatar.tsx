// components/Avatar.tsx

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const getInitial = (name: string | null | undefined, email: string | null | undefined): string => {
  if (name) {
    return name.charAt(0).toUpperCase();
  }
  if (email) {
    return email.charAt(0).toUpperCase();
  }
  return "?";
};

export default function Avatar() {
  const { data } = useSession();

  if (!data || !data.user) {
    return null;
  }

  const user = data.user;
  const avatarImage = user.image;
  const avatarInitial = getInitial(user.name, user.email);
  const titleText = user.name || user.email || "User Avatar";

  // Base Tailwind classes for the avatar container
  const baseClasses = "inline-flex items-center justify-center rounded-full w-10 h-10 overflow-hidden cursor-pointer flex-shrink-0";

  return (
    <div className={baseClasses} title={titleText}>
      {avatarImage ? (
        <Image src={avatarImage} width={45} height={45} alt={user.name || "User profile"} className="w-full h-full object-cover" />
      ) : (
        // 2. Display the user's initial as a fallback
        <div className="w-full h-full flex items-center justify-center bg-indigo-600 text-white text-lg font-semibold">
          <span>{avatarInitial}</span>
        </div>
      )}
    </div>
  );
}
