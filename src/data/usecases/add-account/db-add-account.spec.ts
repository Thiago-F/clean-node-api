import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }

    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await Promise.resolve('hashed_password')
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
