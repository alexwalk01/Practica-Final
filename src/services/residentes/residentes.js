// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  residentesDataValidator,
  residentesPatchValidator,
  residentesQueryValidator,
  residentesResolver,
  residentesExternalResolver,
  residentesDataResolver,
  residentesPatchResolver,
  residentesQueryResolver
} from './residentes.schema.js'
import { ResidentesService, getOptions } from './residentes.class.js'
import { residentesPath, residentesMethods } from './residentes.shared.js'

export * from './residentes.class.js'
export * from './residentes.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const residentes = app => {
  // Register our service on the Feathers application
  app.use(residentesPath, new ResidentesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: residentesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(residentesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(residentesExternalResolver),
        schemaHooks.resolveResult(residentesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(residentesQueryValidator),
        schemaHooks.resolveQuery(residentesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(residentesDataValidator),
        schemaHooks.resolveData(residentesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(residentesPatchValidator),
        schemaHooks.resolveData(residentesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
