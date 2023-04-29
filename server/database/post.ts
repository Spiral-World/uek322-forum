import { Database } from './database'

export class Post {
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
        console.log(await this.getAllPosts())
        console.log(await this.createPost("jeffry", "1", "16"))
        console.log(await this.getAllPosts())
    }

    async createPost(title: string, content: string, userid: string): Promise<boolean> {
        try {
            const query = `
            INSERT INTO posts (
                id,
                userid,
                title,
                content
            ) VALUES (
                NULL,
                '${this._database.preventSQLInjection(userid)}',
                '${this._database.preventSQLInjection(title)}',
                ${this._database.preventSQLInjection(content)}
            );`;

            if (await this._database.executeSQL(query)) {
                console.log(`User: ${userid}, Created a Post: ${title}`)
                return true
            }
            return false
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getAllPosts() {
        return await this._database.executeSQL(`SELECT * FROM posts`)
    }

    async deletePost(id: string) {

    }

}
