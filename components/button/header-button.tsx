'use client'

import { motion } from 'framer-motion'
import cn from '@/utils/cn'
import ComponentVisiblity from '../utils/component-visibility'
import Link from 'next/link'

interface IProps {
  title: string
  icon?: React.ReactNode
  className?: string
  iconPosition?: 'start' | 'end'
  href?: string
  onClick?: () => unknown
}

export default function HeaderButton({
  title,
  icon,
  className,
  iconPosition = 'start',
  href,
  ...props
}: IProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <Link
        href={href || '#'}
        className={cn(
          `p-2 px-3 flex items-center justify-center font-semibold gap-3 
          rounded-md sm:shadow-md uppercase
          bg-blue-500 text-blue-50 
          hover:bg-blue-600 hover:shadow-lg 
          active:scale-95 select-none
          transition-all duration-300`,
          className
        )}
        {...props}
      >
        <motion.span
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          className="flex items-center gap-2"
        >
          <ComponentVisiblity show={iconPosition === 'start'}>
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {icon}
            </motion.span>
          </ComponentVisiblity>

          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {title}
          </motion.span>

          <ComponentVisiblity show={iconPosition === 'end'}>
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {icon}
            </motion.span>
          </ComponentVisiblity>
        </motion.span>
      </Link>
    </motion.div>
  )
}
