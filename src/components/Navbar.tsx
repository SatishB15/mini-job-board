import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  return (
    <nav className="shadow-md bg-white text-gray-900 dark:bg-black dark:text-white transition-colors">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-3xl font-bold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Job Board
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/jobs"
              className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 rounded"
            >
              Jobs
            </Link>
            <Link
              to="/add-job"
              className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 rounded"
            >
              Add Job
            </Link>
            <Link
              to="/bookmarks"
              className="text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 rounded"
            >
              Bookmarks
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar