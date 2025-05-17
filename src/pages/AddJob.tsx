"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useJobStore } from "../store/jobStore"

const AddJob = () => {
  const navigate = useNavigate()
  const addJob = useJobStore((state) => state.addJob)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    role: "",
    location: "",
    description: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.title.trim()) {
      newErrors.title = "Job title is required"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Description should be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    addJob(formData)
    toast.success("Job added successfully!")
    navigate("/jobs")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add a New Job</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block mb-2 font-medium">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block mb-2 font-medium">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company}</p>}
            </div>

            <div>
              <label htmlFor="role" className="block mb-2 font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Full-time, Contract"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.role && <p className="mt-1 text-red-500 text-sm">{errors.role}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block mb-2 font-medium">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, New York"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the job..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[200px] resize-none"
            />
            {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
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
