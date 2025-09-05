export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} RelationshipTracker
          </p>
        </div>
      </div>
    </footer>
  )
}
