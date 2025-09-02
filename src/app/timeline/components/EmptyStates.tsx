"use client"

import { CalendarIcon, CameraIcon, HeartIcon } from "@heroicons/react/24/outline"

interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 h-12 w-12 text-gray-300">{icon ?? <HeartIcon />}</div>
      <h3 className="text-foreground mb-2 text-sm font-medium">{title}</h3>
      <p className="mb-4 text-sm text-gray-500">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary hover:bg-primary-hover inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export function EmptyMilestones() {
  return (
    <EmptyState
      icon={<CalendarIcon />}
      title="No milestones yet"
      description="Start tracking your relationship journey by adding your first milestone."
      action={{
        label: "Add Milestone",
        onClick: () => {
          // TODO: Implement add milestone functionality
          console.log("Add milestone clicked")
        },
      }}
    />
  )
}

export function EmptyHighlights() {
  return (
    <EmptyState
      icon={<CameraIcon />}
      title="No highlights yet"
      description="Capture and highlight your favorite moments together."
      action={{
        label: "Add Highlight",
        onClick: () => {
          // TODO: Implement add highlight functionality
          console.log("Add highlight clicked")
        },
      }}
    />
  )
}

export function EmptyFeed() {
  return (
    <EmptyState
      icon={<HeartIcon />}
      title="No memories yet"
      description="Start documenting your relationship by adding your first memory or note."
      action={{
        label: "Add Memory",
        onClick: () => {
          // TODO: Implement add memory functionality
          console.log("Add memory clicked")
        },
      }}
    />
  )
}
