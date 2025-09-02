"use client"

// TODO: make use of the react skeleton component?
export function MilestonesSkeleton() {
  return (
    <div className="w-full">
      {/* Desktop skeleton */}
      <div className="hidden items-center justify-between md:flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="relative flex-1">
            <div className="group relative flex items-start">
              <div className="flex h-9 items-center">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />
                <div className="mb-1 h-3 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile skeleton */}
      <div className="space-y-6 md:hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="relative flex items-start">
            <div className="flex h-9 items-center">
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="ml-4 min-w-0 flex-1">
              <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />
              <div className="mb-1 h-3 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HighlightsSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden pb-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-32 flex-shrink-0">
          <div className="relative">
            <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="mt-3 text-center">
              <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />
              <div className="mx-auto h-3 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FeedSkeleton() {
  return (
    <ul role="list" className="-mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <div className="relative pb-8">
            {i !== 4 && (
              <span
                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
            )}

            <div className="relative flex space-x-3">
              <div>
                <span className="ring-background flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-gray-200 ring-8" />
              </div>

              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />
                  <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="h-6 w-12 animate-pulse rounded-full bg-gray-200" />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <div key={j} className="h-16 w-16 animate-pulse rounded-lg bg-gray-200" />
                    ))}
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <div className="mb-1 h-3 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
