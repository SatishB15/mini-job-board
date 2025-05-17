import { Link } from "react-router-dom"
import { Bookmark } from "lucide-react"
import { useJobStore } from "../store/jobStore"

const BookmarkedJobs = () => {
  const { jobs, bookmarkedJobs, toggleBookmark } = useJobStore()
  const bookmarkedJobList = jobs.filter((job) => bookmarkedJobs.includes(job.id))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bookmarked Jobs</h1>

      {bookmarkedJobList.length > 0 ? (
        <div>
          {bookmarkedJobList.map((job) => (
            <div
              key={job.id}
              className="card mb-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-center gap-4 p-4">
                <Link to={`/jobs/${job.id}`} className="flex-grow block min-w-0">
                  <h3 className="text-xl font-bold truncate">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 truncate">{job.company}</p>
                  <div className="flex flex-wrap items-center mt-2 gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">{job.location}</span>
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">{job.role}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </Link>
                <button
                  onClick={() => toggleBookmark(job.id)}
                  className="ml-4 p-2 rounded-full border transition-colors bg-yellow-100 border-yellow-300 text-yellow-500 dark:bg-yellow-900 dark:border-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-800"
                  aria-label="Remove bookmark"
                >
                  <Bookmark className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 card">
          <h2 className="text-xl font-semibold mb-4">No Bookmarked Jobs</h2>
          <Link
            to="/jobs"
            className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition duration-300"
          >
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  )
}

export default BookmarkedJobs
