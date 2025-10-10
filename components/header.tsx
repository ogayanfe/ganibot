'use client'

import { motion } from 'framer-motion'
import ToggleTheme from '@/utils/toggle-theme'
import IconLink from './utils/icon-link'
import { FaGithub } from 'react-icons/fa6'
import { PROJECT_GITHUB_URL } from '@/utils/constants'
import { signIn, signOut } from 'next-auth/react'
import useAuthenticatedSession from '@/hooks/utils/use-authenticated'
import ComponentVisiblity from './utils/component-visibility'
import { CiLogin, CiLogout } from 'react-icons/ci'
import HeaderButton from './button/header-button'
import Avatar from './avatar'
import IconButton from './button/icon-button'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import HeaderTitle from './header-title'

export default function Header() {
  const authenticated = useAuthenticatedSession()

  return (
    <motion.header
      initial={{ y: -25, opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ y: 0, opacity: 1, backdropFilter: 'blur(14px)' }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Apple-style “fluid” ease
      }}
      className={`
        flex w-full items-center justify-between 
        p-6 md:px-12
        border-b border-gray-200/40 dark:border-gray-800/60
        bg-white/50 dark:bg-[#0B0F19]/40
        backdrop-blur-xl backdrop-saturate-150
        sticky top-0 z-50
        shadow-sm hover:shadow-md transition-shadow duration-500
      `}
    >
      {/* Logo / Title */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <HeaderTitle />
      </motion.div>

      {/* Right Controls */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
        className="flex gap-3 sm:gap-6 items-center justify-between"
      >
        {/* Authentication (Desktop) */}
        <ComponentVisiblity show={!authenticated}>
          <HeaderButton
            title="Sign In"
            className="bg-blue-500 text-blue-50 max-sm:hidden hover:bg-blue-600 transition"
            icon={<CiLogin className="text-xl" />}
            onClick={() => signIn()}
          />
        </ComponentVisiblity>

        <ComponentVisiblity show={authenticated}>
          <HeaderButton
            title="Sign Out"
            className="bg-blue-500 text-blue-50 max-sm:hidden hover:bg-blue-600 transition"
            icon={<CiLogout className="text-xl" />}
            onClick={() => signOut()}
          />
        </ComponentVisiblity>

        {/* Theme Toggle */}
        <motion.div whileHover={{ rotate: 5 }} whileTap={{ scale: 0.9 }}>
          <ToggleTheme />
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          whileHover={{ scale: 1.12, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        >
          <IconLink
            href={PROJECT_GITHUB_URL}
            target="_blank"
            label="View project on GitHub"
            className="transition-all"
          >
            <FaGithub className="text-lg sm:text-xl" />
          </IconLink>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
          whileHover={{ scale: 1.05 }}
        >
          <Avatar />
        </motion.div>

        {/* Mobile Auth Icon */}
        <motion.div whileTap={{ scale: 0.9 }}>
          <IconButton
            className="text-2xl sm:hidden"
            label={authenticated ? 'Sign Out' : 'Sign In'}
            onClick={() => {
              if (authenticated) {
                signOut()
                return
              }
              signIn()
            }}
          >
            {authenticated ? <FiLogOut /> : <FiLogIn />}
          </IconButton>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}
