import { MissingParamError } from '../../errors'
import { RequiredFieldsValidation } from './required-fields-validation'

describe('RequiredField validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ other: 'other_field' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('Should not return a MissingParamError if validation succeeds', () => {
    const sut = new RequiredFieldsValidation('field')
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeNull()
  })
})
