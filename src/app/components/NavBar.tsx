"use client"

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
import { useState } from "react"

interface NavLink {
  href: string
  label: string
  icon: React.ReactNode
}

const NavIcon = ({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) => (
  <Icon className="h-5 w-5" />
)

const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: <NavIcon Icon={ChartBarIcon} /> },
  { href: "/timeline", label: "Timeline", icon: <NavIcon Icon={CalendarIcon} /> },
  { href: "/settings", label: "Settings", icon: <NavIcon Icon={Cog6ToothIcon} /> },
]

export const NavBar = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
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
              {navLinks.map(({ href, label, icon }) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:text-foreground text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                    >
                      {icon}
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-gray-200 py-4 md:hidden dark:border-gray-700">
            <ul className="space-y-1">
              {navLinks.map(({ href, label, icon }) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:text-foreground text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                    >
                      {icon}
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
