import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter
  ) {}

  async add ({ name, email, password }: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(password)

    return {
      id: 'id',
      name: 'name',
      email: 'email',
      password: 'password'
    }
  }
}
