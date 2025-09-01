import Link from "next/link"

interface NavLink {
  href: string
  label: string
  icon?: React.ReactNode
}

const navLinks: NavLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/timeline", label: "Timeline" },
  { href: "/settings", label: "Settings" },
]

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-center bg-gray-100 shadow">
      <nav>
        <ul className="flex gap-4">
          {navLinks.map(({ href, label, icon }) => (
            <li key={href} className="flex items-center gap-1">
              <Link href={href} className="flex items-center gap-1 hover:underline">
                {icon ?? null}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
