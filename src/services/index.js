import { residents } from './residents/residents.js'

export const services = app => {
  app.configure(residents)
}
