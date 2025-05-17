"use client"

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useJobStore } from "../store/jobStore"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(50, "Description should be at least 50 characters"),
})

type JobFormData = z.infer<typeof jobSchema>

const AddJob = () => {
  const navigate = useNavigate()
  const addJob = useJobStore((state) => state.addJob)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      role: "",
      location: "",
      description: "",
    },
  })

  const onSubmit = (data: JobFormData) => {
    addJob(data);
    toast.success("Job added successfully!");
    reset();
    navigate("/jobs");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add a New Job</h1>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block mb-2 font-medium">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                {...register("title")}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="company" className="block mb-2 font-medium">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                {...register("company")}
                placeholder="Enter company name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company.message}</p>}
            </div>
            <div>
              <label htmlFor="role" className="block mb-2 font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                id="role"
                {...register("role")}
                placeholder="e.g. Full-time, Contract"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.role && <p className="mt-1 text-red-500 text-sm">{errors.role.message}</p>}
            </div>
            <div>
              <label htmlFor="location" className="block mb-2 font-medium">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                {...register("location")}
                placeholder="e.g. Remote, New York"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location.message}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Provide a detailed description of the job..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[200px] resize-none"
            />
            {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
              disabled={isSubmitting}
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddJob
