"use client"

import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, StarIcon } from "@heroicons/react/20/solid"
import {
  CalendarIcon,
  CameraIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"
import { useMemo, useState } from "react"
import { EmptyFeed } from "./EmptyStates"
import { FeedSkeleton } from "./LoadingStates"

interface FeedItem {
  id: string
  type: "milestone" | "memory" | "note" | "photo"
  title: string
  description: string
  date: string
  timestamp: string
  photos?: string[]
  mood?: number
  tags?: string[]
  details?: string
}

const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "milestone",
    title: "Celebrated Our Anniversary",
    description: "One year together! We went to the same restaurant where we had our first date.",
    date: "March 10, 2024",
    timestamp: "7:30 PM",
    mood: 5,
    tags: ["anniversary", "dinner", "special"],
    details:
      "We recreated our first date perfectly. Same table, same dishes, but this time with so much more love and understanding between us.",
  },
  {
    id: "2",
    type: "photo",
    title: "Weekend Hiking Adventure",
    description: "Beautiful day at Mount Wilson trail. The sunset views were incredible!",
    date: "February 28, 2024",
    timestamp: "6:45 PM",
    photos: ["hiking1.jpg", "sunset.jpg"],
    mood: 4,
    tags: ["hiking", "nature", "weekend"],
  },
  {
    id: "3",
    type: "note",
    title: "Little Things",
    description:
      "They left me the sweetest note in my lunch today. It's these small gestures that make my heart flutter.",
    date: "February 20, 2024",
    timestamp: "12:15 PM",
    mood: 5,
    tags: ["sweet", "surprise", "love"],
  },
  {
    id: "4",
    type: "memory",
    title: "Cozy Movie Night",
    description:
      "Watched our favorite rom-com series marathon. Pizza, blankets, and lots of laughter.",
    date: "February 14, 2024",
    timestamp: "8:00 PM",
    mood: 4,
    tags: ["valentine", "movies", "cozy"],
    details:
      "We made it through 4 movies! Started with The Princess Bride and ended with When Harry Met Sally. Classic night in.",
  },
  {
    id: "5",
    type: "milestone",
    title: "Met Their Parents",
    description: "First time meeting the family. Nervous but it went amazingly well!",
    date: "January 15, 2024",
    timestamp: "2:00 PM",
    mood: 4,
    tags: ["family", "milestone", "nervous"],
    details:
      "Their mom made the most incredible lasagna and we played board games until late. I can see where they get their kindness from.",
  },
]

const getIcon = (type: FeedItem["type"]) => {
  switch (type) {
    case "milestone":
      return <CalendarIcon className="h-5 w-5" />
    case "photo":
      return <CameraIcon className="h-5 w-5" />
    case "note":
      return <ChatBubbleLeftIcon className="h-5 w-5" />
    case "memory":
      return <HeartIcon className="h-5 w-5" />
    default:
      return <HeartIcon className="h-5 w-5" />
  }
}

const getTypeColor = (type: FeedItem["type"]) => {
  switch (type) {
    case "milestone":
      return "bg-milestone"
    case "photo":
      return "bg-photo"
    case "note":
      return "bg-note"
    case "memory":
      return "bg-memory"
    default:
      return "bg-gray-500"
  }
}

const MoodIndicator = ({ mood }: { mood?: number }) => {
  if (!mood) return null

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-4 w-4 ${star <= mood ? "text-note" : "text-gray-300"}`}
        />
      ))}
    </div>
  )
}

interface VerticalFeedProps {
  loading?: boolean
}

export function VerticalFeed({ loading = false }: VerticalFeedProps = {}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    feedItems.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter items based on selected tags
  const filteredItems = useMemo(() => {
    if (selectedTags.length === 0) return feedItems
    return feedItems.filter((item) => selectedTags.some((tag) => item.tags?.includes(tag)))
  }, [selectedTags])

  if (loading) {
    return (
      <div className="flow-root">
        <FeedSkeleton />
      </div>
    )
  }

  if (feedItems.length === 0) {
    return <EmptyFeed />
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  return (
    <div className="flow-root">
      {/* Tag filters */}
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 underline hover:text-gray-700"
          >
            Clear filters ({filteredItems.length} of {feedItems.length} items)
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <HeartIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-gray-500">No memories found with the selected tags.</p>
          <button
            onClick={clearFilters}
            className="text-primary hover:text-primary-hover mt-2 underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul role="list" className="-mb-8">
          {filteredItems.map((item, itemIdx) => (
            <li key={item.id}>
              <div className="relative pb-8">
                {itemIdx !== filteredItems.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}

                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`${getTypeColor(
                        item.type,
                      )} ring-background flex h-8 w-8 items-center justify-center rounded-full text-white ring-8`}
                    >
                      {getIcon(item.type)}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div className="min-w-0 flex-1">
                      {item.details ? (
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-start text-left">
                                <div className="flex-1">
                                  <p className="text-foreground text-sm font-medium">
                                    {item.title}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>

                                  <div className="mt-2 flex items-center gap-3">
                                    <MoodIndicator mood={item.mood} />
                                    {item.tags && (
                                      <div className="flex flex-wrap gap-1">
                                        {item.tags.map((tag) => (
                                          <button
                                            key={tag}
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              toggleTag(tag)
                                            }}
                                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                                              selectedTags.includes(tag)
                                                ? "bg-primary text-white"
                                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                            }`}
                                          >
                                            {tag}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <ChevronDownIcon
                                  className={`ml-2 h-5 w-5 text-gray-400 transition-transform ${
                                    open ? "rotate-180" : ""
                                  }`}
                                />
                              </Disclosure.Button>

                              <Disclosure.Panel className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                                {item.details}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ) : (
                        <div>
                          <p className="text-foreground text-sm font-medium">{item.title}</p>
                          <p className="mt-1 text-sm text-gray-600">{item.description}</p>

                          <div className="mt-2 flex items-center gap-3">
                            <MoodIndicator mood={item.mood} />
                            {item.tags && (
                              <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag) => (
                                  <button
                                    key={tag}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleTag(tag)
                                    }}
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                                      selectedTags.includes(tag)
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {item.photos && (
                        <div className="mt-3 flex gap-2">
                          {item.photos.map((photo, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedPhoto(photo)}
                              className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300"
                            >
                              <CameraIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <div>{item.date}</div>
                      <div className="text-xs">{item.timestamp}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Photo modal overlay */}
      {selectedPhoto && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="bg-background w-full max-w-lg rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-foreground text-lg font-medium">Photo: {selectedPhoto}</h3>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="flex h-64 items-center justify-center rounded-lg bg-gray-200">
              <CameraIcon className="h-12 w-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Photo placeholder</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
