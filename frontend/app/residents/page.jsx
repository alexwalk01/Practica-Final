"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import api from "../../lib/axios"
import ResidentsTable from "../../components/ResidentsTable"
import ResidentModal from "../../components/ResidentModal"

export default function ResidentsPage() {
  const router = useRouter()
  const [residents, setResidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedResident, setSelectedResident] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const fetchResidents = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get("/residents")
      setResidents(response.data.data || response.data)
    } catch (err) {
      setError("Error loading residents")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResidents()
  }, [])

  const handleView = (resident) => {
    setSelectedResident(resident)
    setIsModalOpen(true)
  }

  const handleEdit = async (resident) => {
    const result = await Swal.fire({
      title: "Edit resident",
      text: "Do you want to go to the edit page?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    })

    if (result.isConfirmed) {
      const id = resident._id || resident.id
      router.push(`/residents/edit/${id}`)
    }
  }

  const handleDelete = async (resident) => {
    const result = await Swal.fire({
      title: "Delete resident",
      text: "Are you sure you want to delete this resident?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel"
    })

    if (!result.isConfirmed) return

    const id = resident._id || resident.id
    try {
      setDeletingId(id)
      await api.delete(`/residents/${id}`)
      setResidents((prev) => prev.filter((r) => (r._id || r.id) !== id))
      Swal.fire("Deleted!", "Resident has been deleted.", "success")
    } catch (err) {
      Swal.fire("Error", "Error deleting resident.", "error")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Residents</h2>
        <button
          type="button"
          onClick={() => router.push("/residents/new")}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          + New resident
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading residents...</p>}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={fetchResidents}
            className="underline text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <ResidentsTable
          residents={residents}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}

      <ResidentModal
        resident={selectedResident}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

