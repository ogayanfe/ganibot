'use client';
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BsGithub } from "react-icons/bs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-2xl border backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <p className="text-lg">
              Sign in to continue to Gani Assistant
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => signIn("google")}
            >
              <FcGoogle size={20} /> Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => signIn("github")}
            >
              <BsGithub size={20} /> Github
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
