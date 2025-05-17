export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  role: string;
  postedDate: string;
  description: string;
}

export interface JobFormData {
  title: string;
  company: string;
  role: string;
  location: string;
  description: string;
}

export interface JobStateStore {
  jobs: Job[]
  bookmarkedJobs: string[]
  setJobs: (jobs: Job[]) => void
  addJob: (jobData: JobFormData) => void
  toggleBookmark: (jobId: string) => void
  isBookmarked: (jobId: string) => boolean
}