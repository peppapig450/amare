import { HorizontalHighlights } from "./components/HorizontalHighlights"
import { OverviewStepper } from "./components/OverviewStepper"
import { VerticalFeed } from "./components/VerticalFeed"

export default function TimelinePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-foreground mb-8 text-3xl font-bold">Our Timeline</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-foreground mb-6 text-xl font-semibold">Big Moments</h2>
            <OverviewStepper />
          </section>

          <section className="pt-8">
            <h2 className="text-foreground mb-6 text-xl font-semibold">Highlights</h2>
            <HorizontalHighlights />
          </section>

          <section className="pt-12">
            <h2 className="text-foreground mb-6 text-xl font-semibold">Detailed Timeline</h2>
            <VerticalFeed />
          </section>
        </div>
      </div>
    </div>
  )
}
