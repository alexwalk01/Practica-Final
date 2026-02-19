import { MongoDBService } from '@feathersjs/mongodb'

export class ResidentsService extends MongoDBService {
    // Service implementation can be extended here if needed
}

export const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('mongodbClient').then((db) => db.collection('residents'))
    }
}
