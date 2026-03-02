"use client"

export default function ResidentModal({ resident, isOpen, onClose }) {
  if (!isOpen || !resident) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {resident.firstName} {resident.lastName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {resident.photo && (
          <div className="mb-4">
            <img
              src={
                resident.photo.startsWith("http")
                  ? resident.photo
                  : `http://localhost:3030/${resident.photo.replace(/^\/+/, "")}`
              }
              alt="Resident photo"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          </div>
        )}
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">First name:</span>{" "}
            {resident.firstName}
          </p>
          <p>
            <span className="font-semibold">Last name:</span>{" "}
            {resident.lastName}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {resident.gender}
          </p>
          <p>
            <span className="font-semibold">Birth date:</span>{" "}
            {resident.birthDate}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {resident.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {resident.phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Career:</span> {resident.career}
          </p>
          <p>
            <span className="font-semibold">Institution:</span>{" "}
            {resident.institution}
          </p>
          {resident.programmingLanguages && (
            <div>
              <span className="font-semibold">Programming languages:</span>{" "}
              {Object.entries(resident.programmingLanguages)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .join(", ") || "None"}
            </div>
          )}
          {resident.notes && (
            <p>
              <span className="font-semibold">Notes:</span> {resident.notes}
            </p>
          )}
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
