"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { EmptyMilestones } from "./EmptyStates"
import { MilestonesSkeleton } from "./LoadingStates"

interface Milestone {
  id: string
  title: string
  date: string
  description: string
  completed: boolean
}

const milestones: Milestone[] = [
  {
    id: "1",
    title: "First Met",
    date: "January 15, 2023",
    description: "Met at the coffee shop downtown",
    completed: true,
  },
  {
    id: "2",
    title: "First Date",
    date: "February 2, 2023",
    description: "Dinner at that Italian place we love",
    completed: true,
  },
  {
    id: "3",
    title: "Made it Official",
    date: "March 10, 2023",
    description: "Decided to be exclusive",
    completed: true,
  },
  {
    id: "4",
    title: "Moved In Together",
    date: "August 20, 2023",
    description: "Found our perfect apartment",
    completed: true,
  },
  {
    id: "5",
    title: "Anniversary",
    date: "March 10, 2024",
    description: "One year together celebration",
    completed: true,
  },
  {
    id: "6",
    title: "Future Plans",
    date: "TBD",
    description: "Next big milestone on the horizon",
    completed: false,
  },
]

interface OverviewStepperProps {
  loading?: boolean
}

export function OverviewStepper({ loading = false }: OverviewStepperProps = {}) {
  if (loading) {
    return <MilestonesSkeleton />
  }

  if (milestones.length === 0) {
    return <EmptyMilestones />
  }

  return (
    <div className="w-full">
      <nav aria-label="Progress">
        {/* Desktop horizontal layout */}
        <ol role="list" className="hidden items-center justify-between md:flex">
          {milestones.map((milestone, milestoneIdx) => (
            <li key={milestone.id} className="relative flex-1">
              {milestoneIdx !== milestones.length - 1 ? (
                <div
                  className={`absolute top-4 left-4 mt-0.5 -ml-px h-0.5 w-full ${
                    milestone.completed ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-hidden="true"
                />
              ) : null}

              <div className="group relative flex items-start">
                <span className="flex h-9 items-center" aria-hidden="true">
                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      milestone.completed
                        ? "border-primary bg-primary"
                        : "bg-background border-gray-300"
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          milestone.completed ? "bg-transparent" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </span>
                </span>

                <span className="ml-4 min-w-0 flex-1">
                  <span
                    className={`text-sm font-medium ${
                      milestone.completed ? "text-primary" : "text-gray-500"
                    }`}
                  >
                    {milestone.title}
                  </span>
                  <span className="block text-xs text-gray-500">{milestone.date}</span>
                  <span className="mt-1 block text-xs text-gray-400">{milestone.description}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* Mobile vertical layout */}
        <ol role="list" className="space-y-6 md:hidden">
          {milestones.map((milestone, milestoneIdx) => (
            <li key={milestone.id} className="relative">
              {milestoneIdx !== milestones.length - 1 ? (
                <div
                  className={`absolute top-10 left-4 -ml-px h-full w-0.5 ${
                    milestone.completed ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-hidden="true"
                />
              ) : null}

              <div className="group relative flex items-start">
                <span className="flex h-9 items-center" aria-hidden="true">
                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      milestone.completed
                        ? "border-primary bg-primary"
                        : "bg-background border-gray-300"
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          milestone.completed ? "bg-transparent" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </span>
                </span>

                <span className="ml-4 min-w-0 flex-1">
                  <span
                    className={`text-sm font-medium ${
                      milestone.completed ? "text-primary" : "text-gray-500"
                    }`}
                  >
                    {milestone.title}
                  </span>
                  <span className="block text-xs text-gray-500">{milestone.date}</span>
                  <span className="mt-1 block text-xs text-gray-400">{milestone.description}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
