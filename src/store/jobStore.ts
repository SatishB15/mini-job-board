import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Job, JobStateStore } from "../types/job"
import { v4 as uuidv4 } from "uuid"

export const useJobStore = create<JobStateStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      bookmarkedJobs: [],

      setJobs: (jobs) => set((state) => ({
        jobs,
        bookmarkedJobs: state.bookmarkedJobs.filter((id) => jobs.some((job) => job.id === id)),
      })),

      addJob: (jobData) => {
        const newJob: Job = {
          id: uuidv4(),
          postedDate: new Date().toISOString(),
          ...jobData,
        }
        set((state) => ({
          jobs: [newJob, ...state.jobs],
        }))
      },

      toggleBookmark: (jobId) => {
        set((state) => {
          const isCurrentlyBookmarked = state.bookmarkedJobs.includes(jobId)
          return {
            ...state,
            bookmarkedJobs: isCurrentlyBookmarked
              ? state.bookmarkedJobs.filter((id) => id !== jobId)
              : [...state.bookmarkedJobs, jobId],
          }
        })
      },

      isBookmarked: (jobId) => {
        return get().bookmarkedJobs.includes(jobId)
      },
    }),
    {
      name: "job-storage",
    },
  ),
)
