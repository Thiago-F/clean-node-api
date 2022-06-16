import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/cryptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) return null

    await this.hashComparer.compare(password, account.password)
    return null
  }
}
