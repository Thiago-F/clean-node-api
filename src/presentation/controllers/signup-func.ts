import { httpRequest, httpResponse } from '../protocols/http'

export const SignUpController = (httpRequest: httpRequest): httpResponse => {
  const { name, email } = httpRequest.body

  if (!name) {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }

  if (!email) {
    return {
      statusCode: 400,
      body: new Error('Missing param: email')
    }
  }

  return {
    statusCode: 200,
    body: {}
  }
}
