export const Footer = () => {
  return (
    <footer className="h-16 bg-gray-100 shadow-inner flex items-center justify-center">
      {/* TODO: maybe get rid of the date here later*/}
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Relationship Tracker
      </p>
    </footer>
  );
};
