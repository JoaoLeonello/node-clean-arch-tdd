import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { LogControllerDecorator } from '../../presentation/decorators/log'
import { Controller } from '../../presentation/protocols'
import { BcryptAdapter } from './../../infra/criptography/bcrypt.adapter'
import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account'
import { SignUpController } from './../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'

export const makeSignUpController = (): Controller => {
  const salt = 12

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)

  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
