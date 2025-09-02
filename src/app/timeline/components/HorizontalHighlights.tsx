"use client"

import {
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GiftIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid"
import { useEffect, useRef, useState } from "react"
import { EmptyHighlights } from "./EmptyStates"
import { HighlightsSkeleton } from "./LoadingStates"

interface Highlight {
  id: string
  title: string
  date: string
  image?: string
  icon: React.ReactNode
  color: string
}

const highlights: Highlight[] = [
  {
    id: "1",
    title: "First Kiss",
    date: "Feb 2, 2023",
    icon: <HeartIcon className="h-6 w-6" />,
    color: "bg-love",
  },
  {
    id: "2",
    title: "Paris Trip",
    date: "Jun 15, 2023",
    icon: <MapPinIcon className="h-6 w-6" />,
    color: "bg-primary",
  },
  {
    id: "3",
    title: "Birthday Surprise",
    date: "Aug 22, 2023",
    icon: <GiftIcon className="h-6 w-6" />,
    color: "bg-love",
  },
  {
    id: "4",
    title: "Concert Together",
    date: "Oct 12, 2023",
    icon: <CameraIcon className="h-6 w-6" />,
    color: "bg-photo",
  },
  {
    id: "5",
    title: "Holiday Season",
    date: "Dec 25, 2023",
    icon: <HeartIcon className="h-6 w-6" />,
    color: "bg-memory",
  },
  {
    id: "6",
    title: "Valentine's Day",
    date: "Feb 14, 2024",
    icon: <HeartIcon className="h-6 w-6" />,
    color: "bg-love",
  },
  {
    id: "7",
    title: "Spring Getaway",
    date: "Apr 8, 2024",
    icon: <MapPinIcon className="h-6 w-6" />,
    color: "bg-note",
  },
  {
    id: "8",
    title: "Summer Festival",
    date: "Jul 4, 2024",
    icon: <CameraIcon className="h-6 w-6" />,
    color: "bg-photo",
  },
]

interface HorizontalHighlightsProps {
  loading?: boolean
}

export function HorizontalHighlights({ loading = false }: HorizontalHighlightsProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollability()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollability)
      return () => scrollElement.removeEventListener("scroll", checkScrollability)
    }
  }, [])

  if (loading) {
    return <HighlightsSkeleton />
  }

  if (highlights.length === 0) {
    return <EmptyHighlights />
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="bg-background/90 hover:bg-background absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full border border-gray-200 p-2 shadow-lg backdrop-blur-sm transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="text-foreground h-5 w-5" />
        </button>
      )}

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="bg-background/90 hover:bg-background absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full border border-gray-200 p-2 shadow-lg backdrop-blur-sm transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="text-foreground h-5 w-5" />
        </button>
      )}

      {/* Left fade gradient */}
      {canScrollLeft && (
        <div className="from-background pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent" />
      )}

      {/* Right fade gradient */}
      {canScrollRight && (
        <div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l to-transparent" />
      )}

      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {highlights.map((highlight) => (
          <div key={highlight.id} className="group w-32 flex-shrink-0 cursor-pointer">
            <div className="relative">
              <div
                className={`mx-auto h-20 w-20 rounded-full ${highlight.color} flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover:scale-105`}
              >
                {highlight.icon}
              </div>

              <div className="mt-3 text-center">
                <h3 className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                  {highlight.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{highlight.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
