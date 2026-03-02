"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import api from "../../../lib/axios"
import ResidentForm from "../../../components/ResidentForm"

export default function NewResidentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true)

      const birthDateValue =
        values.birthDate instanceof Date
          ? values.birthDate.toISOString().slice(0, 10)
          : values.birthDate

      const hasFile =
        values.photo && values.photo.length && values.photo[0] instanceof File

      if (hasFile) {
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

        await api.post("/residents", formData)
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

        await api.post("/residents", payload)
      }

      await Swal.fire(
        "Success",
        "Resident created successfully.",
        "success"
      )
      router.push("/residents")
    } catch (err) {
      const message =
        err.response?.data?.message || "Error creating resident."
      await Swal.fire("Error", message, "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">New resident</h2>
      <ResidentForm
        mode="create"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
