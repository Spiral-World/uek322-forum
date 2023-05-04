import mariadb from 'mariadb'
import { Pool } from 'mariadb'
import {
  USER_TABLE,
  POSTS_TABLE,
  LIKES_TABLE,
  COMMENTS_TABLE,
  ROLES_TABLE,
  ROLES_TABLE_CONTENT1,
  ROLES_TABLE_CONTENT2,
  ROLES_TABLE_CONTENT3,
  CHECK_IF_ROLE_EXISTS,
  CREATE_DEFAULT_ADMIN,
  CREATE_DEFAULT_MODERATOR,
  CREATE_DEFAULT_USER,
  CHECK_IF_USER_EXISTS,
} from './schema'

export class Database {
  // Properties
  private _pool: Pool
  // Constructor
  constructor() {
    this._pool = mariadb.createPool({
      database: process.env.DB_NAME || 'minitwitter',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'minitwitter',
      password: process.env.DB_PASSWORD || 'supersecret123',
      connectionLimit: 5,
    })
    this.initializeDBSchema()
  }
  // Methods
  private initializeDBSchema = async () => {
    console.log('Initializing DB schema...')
    // users depends on roles, post depends on users and likes and comments depend on user and post

    await this.executeSQL(ROLES_TABLE)
    if (await CHECK_IF_ROLE_EXISTS(this.executeSQL, 'Admin')) {
      await this.executeSQL(ROLES_TABLE_CONTENT1)
    }
    if (await CHECK_IF_ROLE_EXISTS(this.executeSQL, 'Moderator')) {
      await this.executeSQL(ROLES_TABLE_CONTENT2)
    }
    if (await CHECK_IF_ROLE_EXISTS(this.executeSQL, 'User')) {
      await this.executeSQL(ROLES_TABLE_CONTENT3)
    }

    await this.executeSQL(USER_TABLE)
    if (await CHECK_IF_USER_EXISTS(this.executeSQL, 'Admin')) {
      await this.executeSQL(CREATE_DEFAULT_ADMIN)
    }
    if (await CHECK_IF_USER_EXISTS(this.executeSQL, 'Moderator')) {
      await this.executeSQL(CREATE_DEFAULT_MODERATOR)
    }
    if (await CHECK_IF_USER_EXISTS(this.executeSQL, 'User')) {
      await this.executeSQL(CREATE_DEFAULT_USER)
    }

    await this.executeSQL(POSTS_TABLE)
    await this.executeSQL(LIKES_TABLE)
    await this.executeSQL(COMMENTS_TABLE)
  }

  public executeSQL = async (query: string) => {
    try {
      const conn = await this._pool.getConnection()
      const res = await conn.query(query)
      conn.end()
      return res
    } catch (err) {
      console.log(err)
    }
  }

  public preventSQLInjection(text: string): string {
    text = text.replace(/'/g, "\\'")
    /*
    // Regular expresions are not needed, but maybe in the future
    const onlyLettersPattern = /^[A-Za-z0-9\s$/@#*+%&()=.'-?]+$/
    if (!text.match(onlyLettersPattern)) {
      return null
    }
    */
    return text
  }
}
