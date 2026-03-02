"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Swal from "sweetalert2"
import api from "../../../../lib/axios"
import ResidentForm from "../../../../components/ResidentForm"

export default function EditResidentPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  const [resident, setResident] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchResident = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await api.get(`/residents/${id}`)
        setResident(response.data)
      } catch (err) {
        setError("Error loading resident")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchResident()
    }
  }, [id])

  const handleSubmit = async (values) => {
    const result = await Swal.fire({
      title: "Save changes",
      text: "Do you want to update this resident?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    })

    if (!result.isConfirmed) return

    try {
      setIsSubmitting(true)

      const birthDateValue =
        values.birthDate instanceof Date
          ? values.birthDate.toISOString().slice(0, 10)
          : values.birthDate

      const hasNewFile =
        values.photo && values.photo.length && values.photo[0] instanceof File

      if (hasNewFile) {
        const formData = new FormData()
        formData.append("firstName", values.firstName)
        formData.append("lastName", values.lastName)
        formData.append("gender", values.gender)
        formData.append("birthDate", birthDateValue)
        formData.append("phoneNumber", values.phoneNumber)
        formData.append("email", values.email)
        formData.append("institution", values.institution)
        formData.append("career", values.career)
        formData.append(
          "programmingLanguages",
          JSON.stringify(values.programmingLanguages)
        )
        if (values.notes) {
          formData.append("notes", values.notes)
        }
        formData.append("photo", values.photo[0])

        await api.patch(`/residents/${id}`, formData)
      } else {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          birthDate: birthDateValue,
          phoneNumber: values.phoneNumber,
          email: values.email,
          institution: values.institution,
          career: values.career,
          programmingLanguages: values.programmingLanguages,
          notes: values.notes || ""
        }

        await api.patch(`/residents/${id}`, payload)
      }

      await Swal.fire(
        "Success",
        "Resident updated successfully.",
        "success"
      )
      router.push("/residents")
    } catch (err) {
      const message =
        err.response?.data?.message || "Error updating resident."
      await Swal.fire("Error", message, "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-gray-600">Loading resident...</p>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => router.push("/residents")}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Back to list
        </button>
      </div>
    )
  }

  const existingPhotoUrl = resident?.photo
    ? resident.photo.startsWith("http")
      ? resident.photo
      : `http://localhost:3030/${resident.photo.replace(/^\/+/, "")}`
    : null

  const defaultValues = {
    firstName: resident.firstName || "",
    lastName: resident.lastName || "",
    gender: resident.gender || "",
    birthDate: resident.birthDate ? resident.birthDate.slice(0, 10) : "",
    phoneNumber: resident.phoneNumber || "",
    email: resident.email || "",
    institution: resident.institution || "",
    career: resident.career || "",
    programmingLanguages: {
      javascript: resident.programmingLanguages?.javascript || false,
      typescript: resident.programmingLanguages?.typescript || false,
      htmlCss: resident.programmingLanguages?.htmlCss || false,
      php: resident.programmingLanguages?.php || false,
      python: resident.programmingLanguages?.python || false,
      cpp: resident.programmingLanguages?.cpp || false,
      csharp: resident.programmingLanguages?.csharp || false
    },
    notes: resident.notes || ""
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Edit resident</h2>
      <ResidentForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        existingPhotoUrl={existingPhotoUrl}
      />
    </div>
  )
}
