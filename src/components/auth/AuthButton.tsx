"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

interface AuthActionButtonProps {
  onClick: () => void
  variant: "primary" | "danger"
  children: React.ReactNode
}

const AuthActionButton = ({ onClick, variant, children }: AuthActionButtonProps) => {
  const baseClasses =
    "rounded px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  )
}

export const AuthButton = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="bg-foreground/10 h-9 w-20 animate-pulse rounded"></div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user?.name ?? "User"}
              className="size-8 rounded-full"
              height={32}
              width={32}
            />
          )}
          <span className="text-foreground text-sm font-medium">{session.user?.name}</span>
        </div>
        <AuthActionButton
          onClick={() => {
            void signOut({ redirectTo: "/" })
          }}
          variant="danger"
        >
          Sign Out
        </AuthActionButton>
      </div>
    )
  }

  return (
    <AuthActionButton
      onClick={() => {
        void signIn("google")
      }}
      variant="primary"
    >
      Sign In
    </AuthActionButton>
  )
}
