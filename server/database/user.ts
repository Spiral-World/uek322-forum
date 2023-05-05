import { Database } from './database'

import { AUser } from '../interface/interface'

export class User {
  private _database: Database

  constructor(Database: Database) {
    this._database = Database
  }

  // methoden

  async register(name: string, password: string): Promise<boolean> {
    try {
      let alreadyExists: AUser[] = await this._database.executeSQL(
        `SELECT * FROM users WHERE name = '${this._database.preventSQLInjection(
          name
        )}'`
      )
      if (!(alreadyExists.length == 0)) {
        console.log(`Alredy Existing Name: ${name}, Tryed Registering`)
        return false
      }
      if (this._database.preventSQLInjection(name) == null) {
        return false
      }
      if (this._database.preventSQLInjection(password) == null) {
        return false
      }
      const query = `
            INSERT INTO users (
                id,
                name,
                passwdhash,
                role,
                ban
            ) VALUES (
                NULL,
                '${this._database.preventSQLInjection(name)}',
                '${this._database.preventSQLInjection(password)}',
                'User',
                0
            );`

      if (await this._database.executeSQL(query)) {
        console.log(
          `User: ${this._database.preventSQLInjection(name)}, Registerd`
        )
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async getOneUserbyName(name: string): Promise<AUser[]> {
    return await this._database.executeSQL(
      `SELECT * FROM users WHERE name = '${this._database.preventSQLInjection(
        name
      )}'`
    )
  }

  async getOneUserbyId(id: string): Promise<AUser[]> {
    return await this._database.executeSQL(
      `SELECT * FROM users WHERE id = ${this._database.preventSQLInjection(id)}`
    )
  }

  async getAllUsers(): Promise<AUser[]> {
    return await this._database.executeSQL(
      `SELECT id, name, role, ban FROM users`
    )
  }

  async changeUserName(newName: string, Oldname: string): Promise<boolean> {
    let alreadyExists: AUser[] = await this._database.executeSQL(
      `SELECT * FROM users WHERE name = '${this._database.preventSQLInjection(
        Oldname
      )}';`
    )
    if (alreadyExists.length == 0) {
      return false
    }
    if (this._database.preventSQLInjection(newName) == null) {
      return false
    }
    if (
      await this._database.executeSQL(
        `UPDATE users SET name = '${this._database.preventSQLInjection(
          newName
        )}' WHERE name = '${this._database.preventSQLInjection(Oldname)}';`
      )
    ) {
      return true
    }
    return false
  }

  async changeUserPasswd(name: string, passwdhash: string): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE users SET passwdhash = '${this._database.preventSQLInjection(
          passwdhash
        )}' WHERE name = '${this._database.preventSQLInjection(name)}';`
      )
    ) {
      return true
    }
    return false
  }

  async deleteUserbyName(name: string): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `DELETE FROM users WHERE name = '${this._database.preventSQLInjection(
          name
        )}';`
      )
    ) {
      return true
    }
    return false
  }

  async banOrUnbanUser(id: string, ban: boolean): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE users SET ban = ${ban} WHERE id = '${this._database.preventSQLInjection(
          id
        )}';`
      )
    ) {
      return true
    }
    return false
  }

  async isUserBanned(id: string): Promise<AUser[]> {
    return await this._database.executeSQL(
      `SELECT ban FROM users WHERE id = ${this._database.preventSQLInjection(
        id
      )}`
    )
  }

  async changeUserRoll(name: string, newRoll: string): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE users SET role = '${this._database.preventSQLInjection(
          newRoll
        )}' WHERE name = '${this._database.preventSQLInjection(name)}';`
      )
    ) {
      return true
    }
    return false
  }
}
