"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

// Function to derive an initial and gradient color based on user identity
const getInitial = (name?: string | null, email?: string | null): string => {
  if (name) return name.charAt(0).toUpperCase();
  if (email) return email.charAt(0).toUpperCase();
  return "?";
};

const getGradientFromInitial = (char: string) => {
  const colors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-indigo-500 to-violet-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
  ];
  const index = (char.charCodeAt(0) - 65) % colors.length;
  return colors[index];
};

export default function Avatar() {
  const { data } = useSession();

  if (!data?.user) return null;

  const user = data.user;
  const avatarImage = user.image;
  const avatarInitial = getInitial(user.name, user.email);
  const gradient = getGradientFromInitial(avatarInitial);
  const titleText = user.name || user.email || "User Avatar";

  return (
    <motion.div
      title={titleText}
      className="inline-flex items-center justify-center rounded-full w-10 h-10 overflow-hidden cursor-pointer flex-shrink-0 shadow-sm border border-gray-300 dark:border-gray-700"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      {avatarImage ? (
        <Image
          src={avatarImage}
          width={42}
          height={42}
          alt={user.name || "User profile"}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white text-lg font-semibold`}
        >
          <span>{avatarInitial}</span>
        </div>
      )}
    </motion.div>
  );
}
