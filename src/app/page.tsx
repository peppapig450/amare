import Link from "next/link"
import { HeartIcon, CalendarIcon, CameraIcon, ChartBarIcon } from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50 dark:from-background dark:to-gray-900">
      {/* Hero Section */}
      <section className="px-6 pt-20 pb-16">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-love/10">
              <HeartIcon className="h-8 w-8 text-love" />
            </div>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Your Love Story,{" "}
            <span className="text-primary">Beautifully Tracked</span>
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            Capture every precious moment, milestone, and memory with your partner. 
            Build a timeline of your relationship that you'll treasure forever.
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="bg-primary hover:bg-primary-hover flex h-12 w-full items-center justify-center gap-2 rounded-lg px-8 text-sm font-medium text-white transition-colors sm:w-auto sm:text-base"
            >
              <ChartBarIcon className="h-5 w-5" />
              View Dashboard
            </Link>
            <Link
              href="/timeline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-8 text-sm font-medium text-foreground transition-colors hover:bg-gray-50 sm:w-auto sm:text-base dark:border-gray-600 dark:hover:bg-gray-800"
            >
              <CalendarIcon className="h-5 w-5" />
              Explore Timeline
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Everything you need to cherish your journey together
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              From first dates to anniversaries, capture it all in one beautiful, organized space.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Dashboard Feature */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ChartBarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Relationship Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track days together, milestones reached, mood patterns, and activities. 
                See your love story in beautiful statistics.
              </p>
            </div>

            {/* Timeline Feature */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-milestone/10">
                <CalendarIcon className="h-6 w-6 text-milestone" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Interactive Timeline
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chronicle every special moment from first dates to anniversaries. 
                Filter by tags, mood, and memory type.
              </p>
            </div>

            {/* Memory Feature */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-photo/10">
                <CameraIcon className="h-6 w-6 text-photo" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                Rich Memories
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add photos, detailed notes, mood ratings, and tags to create 
                vivid memories you can revisit anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Preview Section */}
      <section className="bg-gray-50 px-6 py-16 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-foreground">
            See your relationship grow
          </h2>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-2 text-3xl font-bold text-love">847</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Days Together</div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-2 text-3xl font-bold text-milestone">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Milestones</div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-2 text-3xl font-bold text-note">8.5/10</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Mood Rating</div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-2 text-3xl font-bold text-photo">34</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Activities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Start tracking your love story today
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            Every moment matters. Don't let the precious memories fade away.
          </p>
          <Link
            href="/dashboard"
            className="bg-primary hover:bg-primary-hover inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 text-base font-medium text-white transition-colors"
          >
            <HeartIcon className="h-5 w-5" />
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
