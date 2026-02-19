"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect } from "react"

const careers = [
  "Computer Systems Engineering",
  "Information Technology Engineering",
  "Informatics Engineering",
  "Business Management Engineering"
]

const programmingLanguageKeys = [
  "javascript",
  "typescript",
  "htmlCss",
  "php",
  "python",
  "cpp",
  "csharp"
]

const programmingLanguagesShape = programmingLanguageKeys.reduce((acc, key) => {
  acc[key] = yup
    .boolean()
    .required()
    .default(false)
  return acc
}, {})

const residentSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"])
    .required("Gender is required"),
  birthDate: yup
    .date()
    .max(new Date(), "Birth date cannot be in the future")
    .required("Birth date is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required(),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  institution: yup.string().required(),
  career: yup
    .string()
    .oneOf(careers)
    .required(),
  programmingLanguages: yup
    .object(programmingLanguagesShape)
    .required(),
  notes: yup.string().nullable(),
  photo: yup.mixed().nullable()
})

export default function ResidentForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
  existingPhotoUrl
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(residentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      phoneNumber: "",
      email: "",
      institution: "",
      career: "",
      programmingLanguages: programmingLanguageKeys.reduce((acc, key) => {
        acc[key] = false
        return acc
      }, {}),
      notes: ""
    }
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        programmingLanguages: {
          ...programmingLanguageKeys.reduce((acc, key) => {
            acc[key] = false
            return acc
          }, {}),
          ...(defaultValues.programmingLanguages || {})
        }
      })
    }
  }, [defaultValues, reset])

  const submitHandler = (data) => {
    onSubmit(data)
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First name</label>
          <input
            type="text"
            {...register("firstName")}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.firstName && (
            <p className="text-red-600 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center text-sm">
              <input
                type="radio"
                value="Male"
                {...register("gender")}
                className="mr-2"
              />
              <span>Male</span>
            </label>
            <label className="inline-flex items-center text-sm">
              <input
                type="radio"
                value="Female"
                {...register("gender")}
                className="mr-2"
              />
              <span>Female</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-600 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last name</label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.lastName && (
            <p className="text-red-600 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Institution</label>
          <input
            type="text"
            {...register("institution")}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.institution && (
            <p className="text-red-600 text-xs mt-1">
              {errors.institution.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Birth date</label>
          <input
            type="date"
            {...register("birthDate")}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.birthDate && (
            <p className="text-red-600 text-xs mt-1">
              {errors.birthDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            {...register("phoneNumber")}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          {errors.phoneNumber && (
            <p className="text-red-600 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Career</label>
          <select
            {...register("career")}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            {careers.map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>
          {errors.career && (
            <p className="text-red-600 text-xs mt-1">
              {errors.career.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Photo</label>
          {existingPhotoUrl && (
            <div className="mb-2">
              <img
                src={existingPhotoUrl}
                alt="Current photo"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            className="w-full text-sm"
          />
          {errors.photo && (
            <p className="text-red-600 text-xs mt-1">{errors.photo.message}</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Programming languages</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {programmingLanguageKeys.map((key) => (
            <label key={key} className="inline-flex items-center text-sm">
              <input
                type="checkbox"
                {...register(`programmingLanguages.${key}`)}
                className="mr-2"
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
        {errors.programmingLanguages && (
          <p className="text-red-600 text-xs mt-1">
            {errors.programmingLanguages.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          rows={3}
          {...register("notes")}
          className="w-full border rounded px-3 py-2 text-sm"
        />
        {errors.notes && (
          <p className="text-red-600 text-xs mt-1">{errors.notes.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
            ? "Create resident"
            : "Save changes"}
        </button>
      </div>
    </form>
  )
}
