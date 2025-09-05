import { signIn } from "@/auth"
import { FcGoogle } from "react-icons/fc"

interface SignInPageProps {
  searchParams: { callbackUrl?: string }
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
          <p className="text-muted-foreground text-sm">Track your relationship journey together</p>
        </div>

        <form
          action={async () => {
            "use server"
            await signIn("google", {
              redirectTo: searchParams.callbackUrl ?? "/dashboard",
            })
          }}
          className="space-y-4"
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <FcGoogle className="mr-2 h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Continue with Google</span>
            <span aria-hidden>Sign in with Google</span>
          </button>
        </form>
      </div>
    </div>
  )
}
