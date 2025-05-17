import { Routes, Route } from "react-router-dom"
import JobList from "./pages/JobList"
import JobDetail from "./pages/JobDetail"
import AddJob from "./pages/AddJob"
import BookmarkedJobs from "./pages/BookmarkedJobs"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/jobs/:jobId" element={<JobDetail />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/bookmarks" element={<BookmarkedJobs />} />
    </Routes>
  )
}

export default AppRoutes
