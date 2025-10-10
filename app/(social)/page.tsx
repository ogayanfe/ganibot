'use client'

import { motion } from 'framer-motion'
import HeaderButton from '@/components/button/header-button'
import Footer from '@/components/footer'
import ComponentVisiblity from '@/components/utils/component-visibility'
import useAuthenticatedSession from '@/hooks/utils/use-authenticated'
import { signIn } from 'next-auth/react'
import { BsInfoCircle } from 'react-icons/bs'
import { CiLogin } from 'react-icons/ci'
import { LuAudioLines } from 'react-icons/lu'

export default function Page() {
  const authenticated = useAuthenticatedSession()
  const buttonClassNames = 'bg-purple-500 text-[.9em] text-purple-50 mt-3'

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-col h-full items-center justify-between"
    >
      {/* Main section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="font-bold text-blue-500 text-2xl lg:text-3xl flex gap-y-3 px-1 items-center justify-center flex-grow flex-col text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="italic text-center text-gray-700 dark:text-gray-300"
        >
          Think. Ask. Discover
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="italic text-center text-gray-700 dark:text-gray-300"
        >
          Gani — Smarter Conversations in Hausa.
        </motion.p>

        {/* Button group */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="text-xl flex items-center max-sm:flex-col justify-center gap-3 px-2 mt-2"
        >
          <ComponentVisiblity show={!authenticated}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <HeaderButton
                title="Sign In"
                className={`${buttonClassNames} w-[250px] sm:w-[270px]`}
                icon={<CiLogin />}
                onClick={() => signIn()}
              />
            </motion.div>
          </ComponentVisiblity>

          <ComponentVisiblity show={authenticated}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <HeaderButton
                title="Start Conversation"
                className={`${buttonClassNames} w-[250px] sm:w-[270px]`}
                icon={<LuAudioLines />}
                href="/chat"
              />
            </motion.div>
          </ComponentVisiblity>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            <HeaderButton
              title="About Project"
              className={`${buttonClassNames} !bg-blue-500 w-[250px] sm:w-[270px]`}
              icon={<BsInfoCircle />}
              href="/about"
              iconPosition="end"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Footer fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full"
      >
        <Footer />
      </motion.div>
    </motion.div>
  )
}
