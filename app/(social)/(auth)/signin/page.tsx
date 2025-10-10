"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import useAuthenticatedSession from "@/hooks/utils/use-authenticated";

export default function SignInPage() {
  const authenticated = useAuthenticatedSession();
  if (authenticated) return redirect("/");

  return (
    <main className="flex items-center justify-center min-h-screen px-8 py-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0B0F19] dark:to-[#111827] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm shadow-sm border border-gray-200 dark:border-gray-800 rounded-2xl p-8 px-6 flex flex-col items-center bg-white/60 dark:bg-[#0D1117]/40 backdrop-blur-xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-gray-200"
        >
          Sign in to your account
        </motion.h1>

        {/* Sign In Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col gap-4 w-full"
        >
          <motion.button
            type="button"
            title="Google SignIn"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 transition-all"
          >
            <FcGoogle size={20} />
            <span className="text-gray-800 dark:text-gray-200">Continue with Google</span>
          </motion.button>

          <motion.button
            type="button"
            title="Github SignIn"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => signIn("github")}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 transition-all"
          >
            <FaGithub size={20} className="text-gray-800 dark:text-gray-300" />
            <span className="text-gray-800 dark:text-gray-200">Continue with GitHub</span>
          </motion.button>
        </motion.div>

        {/* Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-xs mt-6 text-center text-gray-500 dark:text-gray-400"
        >
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="hover:underline hover:text-blue-500 transition-colors duration-300"
          >
            Terms & Privacy Policy
          </a>
          .
        </motion.p>
      </motion.div>
    </main>
  );
}
