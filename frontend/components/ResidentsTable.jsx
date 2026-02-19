'use client'

export default function ResidentsTable({
  residents,
  onView,
  onEdit,
  onDelete,
  deletingId
}) {
  if (!residents || residents.length === 0) {
    return <p className="text-gray-600">No residents found.</p>
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">First name</th>
            <th className="px-4 py-2 text-left">Last name</th>
            <th className="px-4 py-2 text-left">Gender</th>
            <th className="px-4 py-2 text-left">Birth date</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Institution</th>
            <th className="px-4 py-2 text-left">Career</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((resident) => (
            <tr key={resident._id || resident.id} className="border-t">
              <td className="px-4 py-2">{resident.firstName}</td>
              <td className="px-4 py-2">{resident.lastName}</td>
              <td className="px-4 py-2">{resident.gender}</td>
              <td className="px-4 py-2">{resident.birthDate}</td>
              <td className="px-4 py-2">{resident.phoneNumber}</td>
              <td className="px-4 py-2">{resident.email}</td>
              <td className="px-4 py-2">{resident.institution}</td>
              <td className="px-4 py-2">{resident.career}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onView(resident)}
                    className="inline-flex items-center px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(resident)}
                    className="inline-flex items-center px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(resident)}
                    disabled={deletingId === (resident._id || resident.id)}
                    className="inline-flex items-center px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === (resident._id || resident.id) ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
