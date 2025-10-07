'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-8 py-4">
      <div className="w-full max-w-sm scale-200 shadow-sm border border-gray-200 dark:border-gray-900 rounded-2xl p-8 px-6 flex flex-col items-center overflow-hidden">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Sign in to your account
        </h1>

        <div className="flex flex-col gap-4 w-full">
          <button
            type='button'
            title='Google SignIn'
            onClick={() => signIn('google')}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <button
            type='button'
            title='Github SignIn'
            onClick={() => signIn('github')}
            className="flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-100 transition"
          >
            <FaGithub size={20} />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <p className="text-xs mt-6 text-center">
          By signing in, you agree to our <a href="#" className='hover:underline hover:text-blue-500 transition-colors duration-300'>Terms & Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}
