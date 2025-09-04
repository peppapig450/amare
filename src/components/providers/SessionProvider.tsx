"use client"

import type { Session } from "next-auth"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

interface SessionProviderProps {
  /** Server-fetched session (from auth()). Keeps first paint in sync */
  session: Session | null
  children: ReactNode
  /** Let callers tweak client refresh behavior, basePath, etc.. */
  refreshOnWindowFocus?: boolean
  refetchInterval?: number
  basePath?: string
}

export default function SessionProvider({
  session,
  children,
  refreshOnWindowFocus,
  refetchInterval,
  basePath,
}: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      session={session}
      refetchOnWindowFocus={refreshOnWindowFocus}
      refetchInterval={refetchInterval}
      basePath={basePath}
    >
      {children}
    </NextAuthSessionProvider>
  )
}
