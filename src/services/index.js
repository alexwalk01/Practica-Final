import { residentes } from './residentes/residentes.js'
export const services = app => {
  app.configure(residentes)

  // All services will be registered here
}
