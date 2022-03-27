import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient

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
}

export default new MongoHelper()
