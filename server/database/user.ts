import { Database } from './database'

export class User {
    private _database: Database

    constructor(Database: Database) {
        this._database = Database
    }

    // methoden

    async login(email:string, password:string) {
        try {

        } catch(e) {

        }
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
                role
            ) VALUES (
                NULL,
                '${this._database.preventSQLInjection(name)}',
                '${this._database.preventSQLInjection(email)}',
                '${this._database.preventSQLInjection(password)}',
                '${this._database.preventSQLInjection(role)}'
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

    async getOneUsers(email: string) {
        let user: any
        if (!(user = await this._database.executeSQL(`SELECT * FROM users WHERE email = ${this._database.preventSQLInjection(email)}`))) {
            return user
        }
        return false
    }

    async getAllUsers() {

    }

    async changeUserData() {

    }


}
