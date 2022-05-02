import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const controller = new SignUpController(emailValidator, dbAddAccount)

  class FakeLogErrorRepository implements LogErrorRepository {
    async log (stack: string): Promise<void> {}
  }
  const fakeLogErrorRepository = new FakeLogErrorRepository()
  return new LogControllerDecorator(controller, fakeLogErrorRepository)
}
