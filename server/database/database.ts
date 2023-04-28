import mariadb from 'mariadb'
import { Pool } from 'mariadb'
import { USER_TABLE, POSTS_TABLE, LIKES_TABLE, COMMENTS_TABLE, ROLES_TABLE, ROLES_TABLE_CONTENT1, ROLES_TABLE_CONTENT2, ROLES_TABLE_CONTENT3 } from './schema'

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
    await this.executeSQL(ROLES_TABLE_CONTENT1)
    await this.executeSQL(ROLES_TABLE_CONTENT2)
    await this.executeSQL(ROLES_TABLE_CONTENT3)
    await this.executeSQL(USER_TABLE)
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
      //console.log(err)
    }
  }

  preventSQLInjection(text: string) {
    const onlyLettersPattern = /^[A-Za-z0-9]+$/;
    if (!text.match(onlyLettersPattern)) {
      return null
    }
    return text
  }

}
