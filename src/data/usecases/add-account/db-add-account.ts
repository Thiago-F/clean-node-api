import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add ({ name, email, password }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(password)
    await this.addAccountRepository.add({ name, email, password: hashedPassword })

    return {
      id: 'id',
      name: 'name',
      email: 'email',
      password: 'password'
    }
  }
}
