import { forEach } from 'rambda'
import { Database } from './database'

export class Post {
  private _database: Database

  constructor(Database: Database) {
    this._database = Database
  }

  // methoden

  async createPost(
    title: string,
    content: string,
    userid: string
  ): Promise<boolean> {
    try {
      const query = `
            INSERT INTO posts (
                id,
                userid,
                title,
                content
            ) VALUES (
                NULL,
                ${this._database.preventSQLInjection(userid)},
                '${this._database.preventSQLInjection(title)}',
                '${this._database.preventSQLInjection(content)}'
            );`

      if (await this._database.executeSQL(query)) {
        console.log(`User: ${userid}, Created a Post: ${title}`)
        return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async getAllPosts() {
    let arrayOfPosts: object[] = await this._database.executeSQL(
      `SELECT * FROM posts`
    )

    let newPostsWithCommentsLikes: object[] = []
    
    for (let i = 0; i < arrayOfPosts.length; i++) {
        const post: object = arrayOfPosts[i];

        let newLikes: object[] = []
        let commentsFromPost: object[] = await this._database.executeSQL(`SELECT * FROM comments`)
        for (let index = 0; index < commentsFromPost.length; index++) {
            const element = commentsFromPost[index];

            if (element.postid == post.id) {
                newLikes.push(element)
            }
        }

        let newComments: object[] = []
        let likesFromPost: object[] = await this._database.executeSQL(`SELECT * FROM likes`)
        for (let index = 0; index < likesFromPost.length; index++) {
            const element = likesFromPost[index];

            if (element.postid == post.id) {
                newComments.push(element)
            }
        }
        
        newPostsWithCommentsLikes.push({
            id: post.id,
            title: post.title,
            content: post.content,
            userid: post.userid,
            comments: newComments,
            likes: newLikes
        })
    }

    return newPostsWithCommentsLikes
  }

  async deletePost(id: string): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `DELETE FROM posts WHERE id = ${this._database.preventSQLInjection(id)}`
      )
    ) {
      return true
    }
    return false
  }

  async changePostData(
    id: string,
    titel: string,
    content: string
  ): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE posts SET title = '${this._database.preventSQLInjection(
          titel
        )}', content = '${this._database.preventSQLInjection(
          content
        )}' WHERE id = ${this._database.preventSQLInjection(id)}`
      )
    ) {
      return true
    }
    return false
  }

  async likeOrDislikeAPost(
    userID: string,
    postId: string,
    likeing: boolean
  ): Promise<boolean> {
    try {
      let doesItExist: object[] = await this._database.executeSQL(
        `SELECT * FROM likes WHERE userid = ${this._database.preventSQLInjection(
          userID
        )} AND postid = ${this._database.preventSQLInjection(postId)}`
      )
      if (doesItExist.length <= 0) {
        await this._database
          .executeSQL(`INSERT INTO likes (id, userid, postid, likeit) VALUES (
                NULL,
                ${this._database.preventSQLInjection(userID)},
                ${this._database.preventSQLInjection(postId)},
                ${likeing}
            );`)
        return true
      }
      if (doesItExist[0].likeit != likeing) {
        await this._database.executeSQL(
          `UPDATE likes SET likeit = ${likeing} WHERE userid = ${this._database.preventSQLInjection(
            userID
          )} AND postid = ${this._database.preventSQLInjection(postId)}`
        )
        return true
      } else {
        await this._database.executeSQL(
          `DELETE FROM likes WHERE userid = ${this._database.preventSQLInjection(
            userID
          )} AND postid = ${this._database.preventSQLInjection(postId)}`
        )
        return true
      }
    } catch (e) {
      return false
    }
  }

  async commentOnAPost(
    userID: string,
    postId: string,
    test: string
  ): Promise<boolean> {
    if (
      await this._database
        .executeSQL(`INSERT INTO comments (id, userid, postid, text) VALUES (
            NULL,
            ${this._database.preventSQLInjection(userID)},
            ${this._database.preventSQLInjection(postId)},
            '${this._database.preventSQLInjection(test)}'
        );`)
    ) {
      return true
    }
    return false
  }

  async deleteAComment(id: string): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `DELETE FROM comments WHERE id = ${this._database.preventSQLInjection(
          id
        )}`
      )
    ) {
      return true
    }
    return false
  }
}
