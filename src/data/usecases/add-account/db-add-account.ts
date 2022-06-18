import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add ({ name, email, password }: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(password)
    const account = await this.addAccountRepository.add({ name, email, password: hashedPassword })
    return account
  }
}
