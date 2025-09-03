"use client"

import { Disclosure } from "@headlessui/react"
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLink {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: ChartBarIcon },
  { href: "/timeline", label: "Timeline", icon: CalendarIcon },
  { href: "/settings", label: "Settings", icon: Cog6ToothIcon },
]

const NavLinkItem = ({
  href,
  label,
  icon: Icon,
  mobile = false,
  onClick,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  mobile?: boolean
  onClick?: () => void
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  const baseClasses = "flex items-center gap-2 rounded-lg text-sm font-medium transition-colors"
  const activeClasses = "bg-primary text-white"
  const inactiveClasses =
    "text-gray-600 hover:bg-gray-100 hover:text-foreground dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
  const mobileClasses = mobile ? "gap-3 px-4 py-3" : "px-4 py-2"

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${mobileClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  )
}

export const NavBar = () => {
  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80"
    >
      {({ open, close }) => (
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <Link href="/" className="text-foreground flex items-center gap-2 font-bold">
              <div className="bg-love/10 flex h-8 w-8 items-center justify-center rounded-lg">
                <HeartIcon className="text-love h-4 w-4" />
              </div>
              <span className="text-xl">RelationshipTracker</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <Disclosure.Button className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800">
              <span className="sr-only">Toggle menu</span>
              {open ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="border-t border-gray-200 py-4 md:hidden dark:border-gray-700">
            <nav>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLinkItem {...link} mobile onClick={close} />
                  </li>
                ))}
              </ul>
            </nav>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
