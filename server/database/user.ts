import { Database } from './database'

export class User {
    private _database: Database

    constructor(Database: Database) {
        this._database = Database
        this.say()
    }

    // methoden

    /**
     * USED TO TEST METHODS PLEASE DELETE
     */
    async say() {
        console.log(await this.getAllUsers())
        console.log(await this.register("jeffry", "email", "7584irjfhu84", "Admin"))
        console.log(await this.getOneUser("email"))
        console.log(await this.changeUserName("email", "tomas"))
        console.log(await this.getAllUsers())
        console.log(await this.changeUserPasswd("email", "64738iwekjdfhz4u3iejrfnbhgtzreujdf"))
        console.log(await this.getAllUsers())
        console.log(await this.deleteUserbyEmail("email"))
        console.log(await this.getAllUsers())
        console.log(await this.banOrUnbanUser("4", true))
        console.log(await this.isUserBanned("4"))
        console.log(await this.banOrUnbanUser("1", true))
        console.log(await this.isUserBanned("1"))
        console.log(await this.banOrUnbanUser("1", false))
        console.log(await this.isUserBanned("1"))
        console.log(await this.getAllUsers())
    }

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

    async getOneUser(email: string) {
        return await this._database.executeSQL(`SELECT * FROM users WHERE email = '${this._database.preventSQLInjection(email)}'`)
    }

    async getAllUsers() {
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

    isUserBanned(id: string) {
        return this._database.executeSQL(`SELECT ban FROM users WHERE id = ${this._database.preventSQLInjection(id)}`)
    }

}
