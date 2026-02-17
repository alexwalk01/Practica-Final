export const residentesPath = '/residentes'

export const residentesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const residentesClient = client => {
  const connection = client.get('connection')

  client.use(residentesPath, connection.service(residentesPath), {
    methods: residentesMethods
  })
}
