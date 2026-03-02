import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  residentsDataValidator,
  residentsPatchValidator,
  residentsQueryValidator,
  residentsResolver,
  residentsExternalResolver,
  residentsDataResolver,
  residentsPatchResolver,
  residentsQueryResolver
} from './residents.schema.js'
import { ResidentsService, getOptions } from './residents.class.js'
import { residentsPath, residentsMethods } from './residents.shared.js'
import multer from 'multer'
import path from 'path'
import { BadRequest } from '@feathersjs/errors'

export * from './residents.class.js'
export * from './residents.schema.js'

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Custom Hook: Validate Birth Date Not Future
const validateDateNotFuture = async context => {
  const { data } = context
  if (data.birthDate) {
    const birthDate = new Date(data.birthDate)
    const today = new Date()
    if (birthDate > today) {
      throw new BadRequest('Birth date cannot be in the future')
    }
  }
  return context
}

// Middleware to handle file path and JSON parsing for FormData
const handleDataParsing = (req, res, next) => {
  if (req.file) {
    // Standardize path separators
    req.body.photo = req.file.path.replace(/\\/g, '/')
  }

  // Parse programmingLanguages if it comes as string (FormData)
  if (req.body.programmingLanguages && typeof req.body.programmingLanguages === 'string') {
    try {
      req.body.programmingLanguages = JSON.parse(req.body.programmingLanguages)
    } catch (e) {
      // Validation schema will catch invalid format
    }
  }
  next()
}

export const residents = app => {
  // Register our service on the Feathers application
  app.use(residentsPath, upload.single('photo'), handleDataParsing, new ResidentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: residentsMethods,
    // can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(residentsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(residentsExternalResolver),
        schemaHooks.resolveResult(residentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(residentsQueryValidator),
        schemaHooks.resolveQuery(residentsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(residentsDataValidator),
        schemaHooks.resolveData(residentsDataResolver),
        validateDateNotFuture
      ],
      patch: [
        schemaHooks.validateData(residentsPatchValidator),
        schemaHooks.resolveData(residentsPatchResolver),
        validateDateNotFuture
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
