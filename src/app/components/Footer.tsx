export const Footer = () => {
  return (
    <footer className="flex h-16 items-center justify-center bg-gray-100 shadow-inner">
      {/* TODO: maybe get rid of the date here later*/}
      <p className="text-sm">&copy; {new Date().getFullYear()} Relationship Tracker</p>
    </footer>
  )
}
