import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  private client: MongoClient

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useUnifiedTopology: true
    })
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}

export default new MongoHelper()
