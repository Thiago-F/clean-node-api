import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/cryptography/hash-comparer'
import { TokenGenerator } from '../../protocols/cryptography/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(email)
    if (!account) return null

    const isValid = await this.hashComparer.compare(password, account.password)
    if (!isValid) return null

    const token = await this.tokenGenerator.generate(account.id)
    if (!token) return null

    return token
  }
}
