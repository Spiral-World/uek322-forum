import { Database } from './database'

export class User {
    private _database: Database

    constructor(Database: Database) {
        this._database = Database
    }

    // methoden

    async login(email:string, password:string) {
        

    }

    async register(name: string, email:string, password:string, role:string): Promise<boolean> {

        try {
            if (!(await this._database.executeSQL(`SELECT * FROM users WHERE email = ${this._database.preventSQLInjection(email)}`))) {
                return false
            }
            const query = `
            INSERT INTO users (
                id,
                name,
                email,
                password,
                role
            ) VALUES (
                NULL,
                '${this._database.preventSQLInjection(name)}',
                '${this._database.preventSQLInjection(email)}',
                '${this._database.preventSQLInjection(password)}',
                '${this._database.preventSQLInjection(role)}'
            );`;
            await this._database.executeSQL(query)
            return true
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
