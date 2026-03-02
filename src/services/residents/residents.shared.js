export const residentsPath = 'residents'

export const residentsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const residentsClient = client => {
  const connection = client.get('connection')

  client.use(residentsPath, connection.service(residentsPath), {
    methods: residentsMethods
  })
}
