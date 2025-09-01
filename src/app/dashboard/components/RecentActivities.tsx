interface Activity {
  id: string
  type: "milestone" | "mood" | "date" | "note"
  title: string
  description: string
  date: string
  icon: React.ReactNode
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "milestone",
    title: "2 Year Anniversary",
    description: "Celebrated our second anniversary with dinner at our favorite restaurant",
    date: "2 days ago",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    id: "2",
    type: "mood",
    title: "Feeling Great",
    description: "Logged a mood rating of 9/10 - had an amazing weekend together",
    date: "5 days ago",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    id: "3",
    type: "date",
    title: "Movie Night",
    description: "Watched the latest Marvel movie and shared popcorn",
    date: "1 week ago",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
        />
      </svg>
    ),
  },
  {
    id: "4",
    type: "note",
    title: "Sweet Note",
    description: "Left a surprise note in their lunch bag saying how much I appreciate them",
    date: "1 week ago",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: "5",
    type: "milestone",
    title: "First Trip Together",
    description: "Memorable weekend getaway to the mountains",
    date: "2 weeks ago",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
]

const getActivityTypeColor = (type: Activity["type"]) => {
  switch (type) {
    case "milestone":
      return "text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400"
    case "mood":
      return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400"
    case "date":
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
    case "note":
      return "text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400"
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

export const RecentActivities = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div
              className={`flex-shrink-0 rounded-full p-2 ${getActivityTypeColor(activity.type)}`}
            >
              {activity.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </h3>
                <span className="ml-2 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                  {activity.date}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
