import { MissingParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeSut = (): ValidationComposite => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return new MissingParamError('field')
    }
  }

  const validationStub = new ValidationStub()
  return new ValidationComposite([validationStub])
}

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
