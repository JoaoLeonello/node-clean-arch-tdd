import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const accountToBeInserted = Object.assign({}, accountData)
    const result = await accountCollection.insertOne(accountToBeInserted)
    const account = Object.assign({}, accountData, { id: result.insertedId.toHexString() })
    return account
  }
}
