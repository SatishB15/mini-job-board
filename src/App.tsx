import { BrowserRouter as Router } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import AppRoutes from "./routes"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import { useThemeStore } from "./store/themeStore"
import { useJobStore } from "./store/jobStore"
import jobsData from "./assets/json/jobs.json"
import { useEffect } from "react"

function App() {
  const { theme } = useThemeStore()
  const { jobs, setJobs } = useJobStore()

  useEffect(() => {
    if (jobs.length === 0) {
      setJobs(jobsData)
    }
  }, [jobs.length, setJobs])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <header>
          <Navbar />
        </header>
        <main className="container max-w-6xl mx-auto px-4 py-8">
          <AppRoutes />
        </main>
        <ToastContainer position="top-right" />
      </div>
    </Router>
  )
}

export default App