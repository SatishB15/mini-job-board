import { useParams, useNavigate } from "react-router-dom"
import { Bookmark, ArrowLeft } from "lucide-react"
import { useJobStore } from "../store/jobStore"

const JobDetail = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { jobs, bookmarkedJobs, toggleBookmark } = useJobStore()

  // Find the specific job from the store
  const job = jobs.find((j) => j.id === jobId)

  if (!job) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="mb-6">The job you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate("/jobs")} className="btn btn-primary">
          Back to Jobs
        </button>
      </div>
    )
  }

  const isBookmarked = bookmarkedJobs.includes(job.id)

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 dark:text-blue-400 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </button>

      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{job.company}</p>
          </div>
          <button
            onClick={() => toggleBookmark(job.id)}
            className="flex items-center px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium transition"
          >
            <Bookmark
              className={`mr-2 h-5 w-5 ${isBookmarked ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
            />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Location</h3>
            <p>{job.location}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Role</h3>
            <p>{job.role}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Posted</h3>
            <p>{new Date(job.postedDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{job.description}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button disabled className="px-6 cursor-not-allowed py-2 disabled:opacity-75 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 shadow-md dark:bg-blue-500 dark:hover:bg-blue-600">
            Apply Now
          </button>
        </div>

      </div>
    </div>
  )
}

export default JobDetail
