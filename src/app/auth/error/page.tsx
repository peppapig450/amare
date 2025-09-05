import Link from "next/link"

const ERROR_MESSAGES = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "Access denied. You do not have permission to sign in",
  Verification: "The verification token has expired or has already been used.",
} as const

const DEFAULT_MESSAGE = "An unexpected error occurred during authentication."

type ErrorCode = keyof typeof ERROR_MESSAGES

interface AuthErrorPageProps {
  searchParams: { error?: string | string[] }
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const raw = searchParams?.error
  const code = Array.isArray(raw) ? raw[0] : 0
  const message = (code && ERROR_MESSAGES[code as ErrorCode]) ?? DEFAULT_MESSAGE

  const btnBase =
    "w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="w-full max-w-md space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-foreground text-3xl font-extrabold">Authentication Error</h1>
          <p className="text-foreground/60 text-sm" aria-live="polite">
            {message}
          </p>
        </header>

        <div className="space-y-4">
          <Link
            href="/auth/signin"
            className={`${btnBase} border border-transparent bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500`}
          >
            Try Again
          </Link>

          <Link
            href="/"
            className={`${btnBase} text-foreground hover:bg-foreground/5 border-foreground/20 border bg-transparent focus:ring-blue-500`}
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  )
}

export const metadata = { title: "Authentication Error" }
