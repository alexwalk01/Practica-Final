// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const residentesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Residentes', additionalProperties: false }
)
export const residentesValidator = getValidator(residentesSchema, dataValidator)
export const residentesResolver = resolve({})

export const residentesExternalResolver = resolve({})

// Schema for creating new entries
export const residentesDataSchema = Type.Pick(residentesSchema, ['text'], {
  $id: 'ResidentesData'
})
export const residentesDataValidator = getValidator(residentesDataSchema, dataValidator)
export const residentesDataResolver = resolve({})

// Schema for updating existing entries
export const residentesPatchSchema = Type.Partial(residentesSchema, {
  $id: 'ResidentesPatch'
})
export const residentesPatchValidator = getValidator(residentesPatchSchema, dataValidator)
export const residentesPatchResolver = resolve({})

// Schema for allowed query properties
export const residentesQueryProperties = Type.Pick(residentesSchema, ['_id', 'text'])
export const residentesQuerySchema = Type.Intersect(
  [
    querySyntax(residentesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const residentesQueryValidator = getValidator(residentesQuerySchema, queryValidator)
export const residentesQueryResolver = resolve({})
