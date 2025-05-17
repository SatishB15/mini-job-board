import { Link } from "react-router-dom"
import type { Job } from "../types/job"
import { Bookmark } from "lucide-react"
import { useJobStore } from "../store/jobStore"
import type { MouseEvent } from "react"

interface JobCardProps {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {
  const { isBookmarked, toggleBookmark } = useJobStore()
  const bookmarked = isBookmarked(job.id)

  const handleBookmarkClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleBookmark(job.id)
  }

  return (
    <div className="card hover:shadow-lg cursor-pointer mb-4 flex justify-between items-start">
      <Link to={`/jobs/${job.id}`} className="flex-grow block">
        <h3 className="text-xl font-bold">{job.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
        <div className="flex items-center mt-2 space-x-4">
          <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{job.location}</span>
          <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{job.role}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Posted on {new Date(job.postedDate).toLocaleDateString()}
        </p>
      </Link>
      <button
        onClick={handleBookmarkClick}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full ml-2"
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        tabIndex={0}
      >
        <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
      </button>
    </div>
  )
}

export default JobCard
