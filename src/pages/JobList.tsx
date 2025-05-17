import { useState } from "react"
import { Link } from "react-router-dom"
import { Bookmark, Search } from "lucide-react"
import { useJobStore } from "../store/jobStore"
import type { Job } from "../types/job"
import Pagination from "../components/Pagination"

const JobList = () => {
  const { jobs, bookmarkedJobs, toggleBookmark } = useJobStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "" || job.location === locationFilter
    const matchesRole = roleFilter === "" || job.role === roleFilter
    return matchesSearch && matchesLocation && matchesRole
  })

  // Get unique locations and roles for filters
  const locations = [...new Set(jobs.map((job) => job.location))]
  const roles = [...new Set(jobs.map((job) => job.role))]

  // Pagination
  const indexOfLastJob = currentPage * itemsPerPage
  const indexOfFirstJob = indexOfLastJob - itemsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Find Your Next Job</h1>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {currentJobs.length > 0 ? (
        <>
          {currentJobs.map((job: Job) => (
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
                  className={`ml-4 p-2 rounded-full border transition-colors
                    ${bookmarkedJobs.includes(job.id)
                      ? "bg-yellow-100 border-yellow-300 text-yellow-500 dark:bg-yellow-900 dark:border-yellow-700"
                      : "bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-700 dark:border-gray-600"}
                    hover:bg-yellow-200 dark:hover:bg-yellow-800`}
                  aria-label={bookmarkedJobs.includes(job.id) ? "Remove bookmark" : "Add bookmark"}
                >
                  <Bookmark
                    className={`h-5 w-5 ${bookmarkedJobs.includes(job.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                  />
                </button>
              </div>
            </div>
          ))}

          <Pagination
            totalItems={filteredJobs.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">No jobs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setLocationFilter("")
              setRoleFilter("")
              setCurrentPage(1)
            }}
            className="mt-4 px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Filters
          </button>

        </div>
      )}
    </div>
  )
}

export default JobList
