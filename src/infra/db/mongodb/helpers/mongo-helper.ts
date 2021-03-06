import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  private client: MongoClient
  private uri: string = ''

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useUnifiedTopology: true
    })
  }

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.uri)

    return this.client.db().collection(name)
  }

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}

export default new MongoHelper()
