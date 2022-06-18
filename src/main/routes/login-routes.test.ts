import request from 'supertest'
import { Collection } from 'mongodb'
import MongoHelper from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Login Routes', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('[POST] /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Thiago',
          email: 'thiago@mail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('[POST] /login', () => {
    test('should return 200 on login', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Thiago',
          email: 'thiago@mail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })

      await request(app)
        .post('/api/login')
        .send({
          email: 'thiago@mail.com',
          password: '123456'
        })
        .expect(200)
    })
  })
})
