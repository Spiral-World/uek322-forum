import { Database } from './database'

export class User {
    private _database: Database

    constructor(Database: Database) {
        this._database = Database
    }

    // methoden

    async register(name: string, email:string, password:string, role:string): Promise<boolean> {
        try {
            if (!(await this._database.executeSQL(`SELECT * FROM users WHERE email = '${this._database.preventSQLInjection(email)}'`))) {
                console.log("User tried using a Already existing mail")
                return false
            }
            const query = `
            INSERT INTO users (
                id,
                name,
                email,
                passwdhash,
                role,
                ban
            ) VALUES (
                NULL,
                '${this._database.preventSQLInjection(name)}',
                '${this._database.preventSQLInjection(email)}',
                '${this._database.preventSQLInjection(password)}',
                '${this._database.preventSQLInjection(role)}',
                0
            );`;

            if (await this._database.executeSQL(query)) {
                console.log(`User: ${name}, ${email}, Registerd`)
                return true
            }
            return false
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getOneUserbyMail(email: string): Promise<object[]> {
        return await this._database.executeSQL(`SELECT * FROM users WHERE email = '${this._database.preventSQLInjection(email)}'`)
    }

    async getOneUserbyId(id: string): Promise<object[]> {
        return await this._database.executeSQL(`SELECT * FROM users WHERE id = ${this._database.preventSQLInjection(id)}`)
    }

    async getAllUsers(): Promise<object[]> {
        return await this._database.executeSQL(`SELECT id, name, email, role, ban FROM users`)
    }

    async changeUserName(email: string, name: string): Promise<boolean> {
        if (await this._database.executeSQL(`UPDATE users SET name = '${this._database.preventSQLInjection(name)}' WHERE email = '${this._database.preventSQLInjection(email)}';`)) {
            return true
        }
        return false
    }

    async changeUserPasswd(email: string, passwdhash: string): Promise<boolean> {
        if (await this._database.executeSQL(`UPDATE users SET passwdhash = '${this._database.preventSQLInjection(passwdhash)}' WHERE email = '${this._database.preventSQLInjection(email)}';`)) {
            return true
        }
        return false
    }

    async deleteUserbyEmail(email: string): Promise<boolean> {
        if (await this._database.executeSQL(`DELETE FROM users WHERE email = '${this._database.preventSQLInjection(email)}';`)) {
            return true
        }
        return false
    }

    async banOrUnbanUser(id: string, ban: boolean) {
        if (await this._database.executeSQL(`UPDATE users SET ban = ${ban} WHERE id = '${this._database.preventSQLInjection(id)}';`)) {
            return true
        }
        return false
    }

    isUserBanned(id: string): Promise<object[]> {
        return this._database.executeSQL(`SELECT ban FROM users WHERE id = ${this._database.preventSQLInjection(id)}`)
    }

}
