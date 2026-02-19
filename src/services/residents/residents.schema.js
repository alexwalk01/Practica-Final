import { getValidator, querySyntax } from '@feathersjs/typebox'
import { resolve } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { Type } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model
export const residentsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.String({ minLength: 1 }),
    gender: Type.Union([Type.Literal('Male'), Type.Literal('Female')]),
    birthDate: Type.String({ format: 'date' }), // "YYYY-MM-DD" or similar ISO date string
    phoneNumber: Type.String({ pattern: '^[0-9]{10}$' }),
    email: Type.String({ format: 'email' }),
    photo: Type.Optional(Type.String()),
    institution: Type.String({ minLength: 1 }),
    career: Type.Union([
      Type.Literal('Computer Systems Engineering'),
      Type.Literal('Information Technology Engineering'),
      Type.Literal('Informatics Engineering'),
      Type.Literal('Business Management Engineering')
    ]),
    programmingLanguages: Type.Object(
      {
        javascript: Type.Boolean(),
        typescript: Type.Boolean(),
        htmlCss: Type.Boolean(),
        php: Type.Boolean(),
        python: Type.Boolean(),
        cpp: Type.Boolean(),
        csharp: Type.Boolean()
      },
      { additionalProperties: false }
    ),
    notes: Type.Optional(Type.String())
  },
  { $id: 'Residents', additionalProperties: false }
)

export const residentsValidator = getValidator(residentsSchema, dataValidator)
export const residentsResolver = resolve({})

export const residentsExternalResolver = resolve({})

// Schema for creating new entries
export const residentsDataSchema = Type.Pick(
  residentsSchema,
  [
    'firstName',
    'lastName',
    'gender',
    'birthDate',
    'phoneNumber',
    'email',
    'photo',
    'institution',
    'career',
    'programmingLanguages',
    'notes'
  ],
  { $id: 'ResidentsData', additionalProperties: false }
)

export const residentsDataValidator = getValidator(residentsDataSchema, dataValidator)
export const residentsDataResolver = resolve({})

// Schema for updating existing entries (PATCH)
export const residentsPatchSchema = Type.Partial(residentsDataSchema, {
  $id: 'ResidentsPatch',
  additionalProperties: false
})

export const residentsPatchValidator = getValidator(residentsPatchSchema, dataValidator)
export const residentsPatchResolver = resolve({})

// Schema for allowed query properties
export const residentsQuerySchema = Type.Intersect(
  [querySyntax(residentsDataSchema), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)

export const residentsQueryValidator = getValidator(residentsQuerySchema, queryValidator)
export const residentsQueryResolver = resolve({})
