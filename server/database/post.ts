import { Database } from './database'

import { APost, ALike, AComment, AUser } from '../interface/interface'

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

  async getAllPosts(): Promise<APost[]> {
    let arrayOfPosts: APost[] = await this._database.executeSQL(
      `SELECT * FROM posts ORDER BY id DESC`
    )

    let newPostsWithCommentsLikes: APost[] = []

    for (let i = 0; i < arrayOfPosts.length; i++) {
      const post: APost = arrayOfPosts[i]

      let personWhoPosted: AUser[] = await this._database.executeSQL(
        `SELECT name FROM users WHERE id = ${post.userid}`
      )

      let newLikes: ALike[] = []
      let likesFromPost: ALike[] = await this._database.executeSQL(
        `SELECT * FROM likes`
      )
      for (let index = 0; index < likesFromPost.length; index++) {
        const element = likesFromPost[index]

        let personWhoLiked: AUser[] = await this._database.executeSQL(
          `SELECT name FROM users WHERE id = ${element.userid}`
        )

        if (element.postid == post.id) {
          newLikes.push({
            id: element.id,
            userid: element.userid,
            likeit: element.likeit,
            author: personWhoLiked[0].name
          })
        }
      }

      let newComments: AComment[] = []
      let commentsFromPost: AComment[] = await this._database.executeSQL(
        `SELECT * FROM comments`
      )
      for (let index = 0; index < commentsFromPost.length; index++) {
        const element = commentsFromPost[index]

        let personWhoComented: AUser[] = await this._database.executeSQL(
          `SELECT name FROM users WHERE id = ${element.userid}`
        )

        if (element.postid == post.id) {
          newComments.push({
            id: element.id,
            userid: element.userid,
            text: element.text,
            author: personWhoComented[0].name
          })
        }
      }

      newPostsWithCommentsLikes.push({
        id: post.id,
        title: post.title,
        content: post.content,
        userid: post.userid,
        author: personWhoPosted[0].name,
        comments: newComments,
        likes: newLikes,
      })
    }

    return newPostsWithCommentsLikes
  }

  async getOnePersonsPosts(userId: string): Promise<APost[] | boolean> {
    const PERSONS_POSTS = await this._database.executeSQL(
      `SELECT * FROM posts WHERE userid = ${this._database.preventSQLInjection(
        userId
      )}`
    )

    let personsPostsWithCommentsLikes: APost[] = []

    for (let i = 0; i < PERSONS_POSTS.length; i++) {
      const post: APost = PERSONS_POSTS[i]

      let newLikes: ALike[] = []
      let likesFromPost: ALike[] = await this._database.executeSQL(
        `SELECT * FROM likes`
      )
      for (let index = 0; index < likesFromPost.length; index++) {
        const element = likesFromPost[index]

        if (element.postid == post.id) {
          newLikes.push(element)
        }
      }

      let newComments: AComment[] = []
      let commentsFromPost: AComment[] = await this._database.executeSQL(
        `SELECT * FROM comments`
      )
      for (let index = 0; index < commentsFromPost.length; index++) {
        const element = commentsFromPost[index]

        if (element.postid == post.id) {
          newComments.push(element)
        }
      }

      personsPostsWithCommentsLikes.push({
        id: post.id,
        titel: post.title,
        content: post.content,
        comments: newComments,
        likes: newLikes,
      })
    }
    return personsPostsWithCommentsLikes
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
      let doesThePostExist: APost[] = await this._database.executeSQL(
        `SELECT * FROM posts WHERE id = ${this._database.preventSQLInjection(
          postId
        )}`
      )
      if (doesThePostExist.length <= 0) {
        return false
      }
      let doesItExist: ALike[] = await this._database.executeSQL(
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
    text: string
  ): Promise<boolean> {
    let doesThePostExist: APost[] = await this._database.executeSQL(
      `SELECT * FROM posts WHERE id = ${this._database.preventSQLInjection(
        postId
      )}`
    )
    if (doesThePostExist.length <= 0) {
      return false
    }
    if (
      await this._database
        .executeSQL(`INSERT INTO comments (id, userid, postid, text) VALUES (
            NULL,
            ${this._database.preventSQLInjection(userID)},
            ${this._database.preventSQLInjection(postId)},
            '${this._database.preventSQLInjection(text)}'
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

  async getAllComments(): Promise<AComment[]> {
    return await this._database.executeSQL(`SELECT * FROM comments`)
  }

  async changeAComment(id: string, text: string): Promise<boolean> {
    if (
      await this._database.executeSQL(
        `UPDATE comments SET text = '${this._database.preventSQLInjection(
          text
        )}' WHERE id = ${this._database.preventSQLInjection(id)}`
      )
    ) {
      return true
    }
    return false
  }
}
