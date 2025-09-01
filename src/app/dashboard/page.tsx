import { QuickActions } from "./components/QuickActions"
import { RecentActivities } from "./components/RecentActivities"
import { StatsCards } from "./components/StatsCards"

export default function Dashboard() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your relationship journey and milestones
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <StatsCards />
          <RecentActivities />
        </div>

        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
