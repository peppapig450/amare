interface QuickAction {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  color: string
}

const quickActions: QuickAction[] = [
  {
    title: "Log Mood",
    description: "Record how you're feeling today",
    href: "/mood/new",
    color: "bg-green-500 hover:bg-green-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Add Milestone",
    description: "Celebrate a special moment",
    href: "/milestones/new",
    color: "bg-purple-500 hover:bg-purple-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    title: "Plan Date",
    description: "Schedule your next adventure",
    href: "/dates/new",
    color: "bg-blue-500 hover:bg-blue-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Write Note",
    description: "Capture a thought or memory",
    href: "/notes/new",
    color: "bg-orange-500 hover:bg-orange-600",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
]

export const QuickActions = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>

      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="group flex items-center rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div
              className={`flex-shrink-0 rounded-lg p-2 text-white ${action.color} transition-transform duration-200 group-hover:scale-110`}
            >
              {action.icon}
            </div>

            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {action.title}
              </h3>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{action.description}</p>
            </div>

            <div className="ml-2 flex-shrink-0">
              <svg
                className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-600">
        <a
          href="/timeline"
          className="flex w-full items-center justify-center rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          View Timeline
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}
