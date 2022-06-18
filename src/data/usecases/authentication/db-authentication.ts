import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) return null

    const isValid = await this.hashComparer.compare(password, account.password)
    if (!isValid) return null

    const token = await this.encrypter.encrypt(account.id)
    if (!token) return null

    await this.updateAccessTokenRepository.updateAccessToken(account.id, token)
    return token
  }
}
