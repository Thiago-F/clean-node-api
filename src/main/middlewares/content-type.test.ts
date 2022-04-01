import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.post('/test_content_type', (request, response) => {
      response.send()
    })

    await request(app)
      .post('/test_content_type')
      .expect('content-type', /json/)
  })

  test('should return xml content type when forced', async () => {
    app.post('/test_content_type_xml', (request, response) => {
      response.type('xml')
      response.send()
    })

    await request(app)
      .post('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
