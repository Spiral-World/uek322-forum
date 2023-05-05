import { Request, Response, Express } from 'express'
import { User, Post } from '../database'

import pkg from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { AUser, APost } from '../interface/interface'

export class API {
  // Properties
  app: Express
  user: User
  post: Post

  private SECRET: string = /* String(process.env.TOKEN_SECRET) |*/ 'FAKE_SECRET'

  // Constructor
  constructor(app: Express, user: User, post: Post) {
    this.app = app
    this.user = user
    this.post = post

    this.app.get('/api/Healthcheck', (req: Request, res: Response) =>
      res.status(200).send(1)
    )
    //User
    this.app.post('/api/Login', this.login.bind(this))
    this.app.post('/api/Logout', this.logout.bind(this))
    this.app.post('/api/Register', this.register.bind(this))
    this.app.put('/api/UserName', this.changeUserName.bind(this))
    this.app.put('/api/UserPWD', this.changeUserPassword.bind(this))
    this.app.delete('/api/User', this.deleteUser.bind(this))
    this.app.get('/api/AllUsers', this.getAllUsers.bind(this))
    this.app.get('/api/WhoAmI', this.whoAmI.bind(this))
    this.app.put('/api/UserRole', this.changeRoll.bind(this))
    //post
    this.app.get('/api/AllPosts', this.getAllPosts.bind(this))
    this.app.post('/api/Like', this.Like.bind(this))
    this.app.put('/api/Post', this.changePost.bind(this))
    this.app.post('/api/Post', this.createPost.bind(this))
    this.app.delete('/api/Post', this.deletePost.bind(this))
    this.app.get('/api/MyPosts', this.myPosts.bind(this))
    //comment
    this.app.put('/api/Comment', this.changeComment.bind(this))
    this.app.delete('/api/Comment', this.deleteComment.bind(this))
    this.app.post('/api/Comment', this.commentOnPost.bind(this))
    //ban
    this.app.post('/api/BanUser', this.banAUser.bind(this))
  }

  // Methods

  private async validateUser(
    token: string,
    privliges: string[],
    res?
  ): Promise<AUser | boolean> {
    try {
      let id = await pkg.verify(token, this.SECRET).id

      const aUser: AUser[] = await this.user.getOneUserbyId(String(id))

      if (aUser[0].ban == 1) {
        if (res === undefined) {
          return false
        }
        res.status(403).json({
          error: 'Banned',
        })
        return false
      }

      for (let i = 0; i < privliges.length; i++) {
        const element = privliges[i]
        if (aUser[0].role == element) {
          return aUser[0]
        }
      }
      if (res === undefined) {
        return false
      }
      res.status(403).json({
        error: 'You Are Not alowed to do this',
      })
      return false
    } catch (e) {
      if (res === undefined) {
        return false
      }
      res.status(403).json({
        error: 'You Are Not alowed to do this',
      })
      return false
    }
  }

  //await this.validateUser(req.cookies.token, ["Admin", "Moderator", "User"], res)

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  private async logout(req: Request, res: Response) {
    res.cookie('token', "", {
      httpOnly: true,
    })
    res.status(200).json({
      info: 'Logged out',
    })
    return
  }

  private async login(req: Request, res: Response) {
    try {
      const data: any = req.body
      if (!data.name) {
        res.status(401).json({
          error: 'Invalid name',
        })
        return
      }
      if (!data.password) {
        res.status(401).json({
          error: 'Invalid password',
        })
        return
      }

      const aUser: AUser[] = await this.user.getOneUserbyName(String(data.name))

      if (aUser[0].ban == 1) {
        res.status(403).json({
          error: 'You Are Not alowed to do this',
        })
        return
      }

      if (
        aUser.length == 0 ||
        !(await bcrypt.compare(String(data.password), aUser[0].passwdhash))
      ) {
        res.status(200).json({
          error: 'Invalid name and password',
        })
        return
      }

      const USER_ID = aUser[0].id

      const token = pkg.sign({ id: USER_ID }, this.SECRET, {
        expiresIn: '5h',
      })

      res.cookie('token', token, {
        httpOnly: true,
      })

      console.log(`UserID: ${USER_ID} Logged In`)

      res.status(201).json({
        info: 'Successfuly created Token',
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        error: 'Login Failed',
      })
    }
  }

  private async register(req: Request, res: Response) {
    try {
      const data: any = req.body
      console.log(req.body);
      if (!data.name) {
        res.status(406).json({
          error: 'Invalid name',
        })
        return
      }
      if (!data.password) {
        res.status(406).json({
          error: 'Invalid password',
        })
        return
      }

      const hashPWD: string = await this.hashPassword(String(data.password))

      if (await this.user.register(String(data.name), hashPWD)) {
        res.status(201).json({
          info: 'Succesfuly Registerd',
        })
        return
      }
      res.status(406).json({
        error:
          'Unable to Registerd, PLease Use A-Z, a-z, 0-9, $, / or . In Your Provided Data Or use another Name',
      })
      return
    } catch (e) {
      console.log(e)
      res.status(500).json({
        error: 'Register Failed',
      })
    }
  }

  private async getAllPosts(req: Request, res: Response) {
    if (
      !(await this.validateUser(
        req.cookies.token,
        ['Admin', 'Moderator', 'User'],
        res
      ))
    ) {
      return
    }

    res.status(200).json(await this.post.getAllPosts())
  }

  private async createPost(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin', 'Moderator', 'User'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.titel) {
      res.status(406).json({
        error: 'Invalid title',
      })
      return
    }
    if (!data.content) {
      res.status(406).json({
        error: 'Invalid content',
      })
      return
    }
    if (!user.id) {
      res.status(406).json({
        error: 'Invalid id',
      })
      return
    }

    this.post.createPost(String(data.titel), String(data.content), String(user.id))

    res.status(201).json({
      info: 'Created a Post',
    })
    return
  }

  // ToDo: Admin/moderator can delete all posts user just own
  private async deletePost(req: Request, res: Response) {
    const data: any = req.body

    if (!data.postid) {
      res.status(406).json({
        error: 'Invalid postid',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['User'])
    if (user !== false) {
      const MY_POSTS: APost[] = await this.post.getOnePersonsPosts(String(user.id))

      for (let i = 0; i < MY_POSTS.length; i++) {
        const element = MY_POSTS[i]

        if (data.postid == element.id) {
          await this.post.deletePost(String(element.id))
          res.status(200).json({
            info: 'deleted post: ' + element.id,
          })
          return
        }
      }
      res.status(404).json({
        error: 'didnt delete a post',
      })
      return
    }
    user = await this.validateUser(req.cookies.token, ['Admin', 'Moderator'])
    if (user !== false) {
      await this.post.deletePost(String(data.postid))
      res.status(200).json({
        info:
          'deleted post, This Post Could Also Not Exist',
      })
      return
    }

    res.status(400).json({
      error: 'didnt delete a post',
    })
    return
  }

  private async changePost(req: Request, res: Response) {
    const data: any = req.body

    if (!data.postid) {
      res.status(406).json({
        error: 'Invalid postid',
      })
      return
    }
    if (!data.titel) {
      res.status(406).json({
        error: 'Invalid titel',
      })
      return
    }
    if (!data.content) {
      res.status(406).json({
        error: 'Invalid content',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['User'])
    if (user !== false) {
      const MY_POSTS: APost[] = await this.post.getOnePersonsPosts(String(user.id))

      for (let i = 0; i < MY_POSTS.length; i++) {
        const element = MY_POSTS[i]

        if (data.postid == element.id) {
          await this.post.changePostData(
            String(element.id),
            String(data.titel),
            String(data.content)
          )
          res.status(200).json({
            info: 'changed post: ' + element.id,
          })
          return
        }
      }
      res.status(404).json({
        error: 'didnt change a post',
      })
      return
    }
    user = await this.validateUser(req.cookies.token, ['Admin', 'Moderator'])
    if (user !== false) {
      if (await this.post.changePostData(
        String(data.postid),
        String(data.titel),
        String(data.content)
      )) {
        res.status(200).json({
          info:
            'changed post',
        })
        return
      }
      res.status(404).json({
        error: 'post does not exist',
      })
      return
    }
  }

  private async myPosts(req: Request, res: Response) {
    let user = await this.validateUser(
      req.cookies.token,
      ['Admin', 'Moderator', 'User'],
      res
    )
    if (!user) {
      return
    }
    const MY_POSTS: APost[] = await this.post.getOnePersonsPosts(String(user.id))

    if (!MY_POSTS) {
      res.status(401).json({
        error: 'Unable to get your posts',
      })
    }
    res.status(200).json(MY_POSTS)
  }

  private async getAllUsers(req: Request, res: Response) {
    if (!(await this.validateUser(req.cookies.token, ['Admin'], res))) {
      return
    }
    res.status(200).json(await this.user.getAllUsers())
  }

  private async whoAmI(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin', 'Moderator', 'User'],
      res
    )
    if (!user) {
      return
    }
    const ME = await this.user.getOneUserbyId(String(user.id))

    const ME_BUT_NO_PASWD = {
      id: ME[0].id,
      name: ME[0].name,
      role: ME[0].role,
    }

    res.status(200).json(ME_BUT_NO_PASWD)
  }

  private async deleteUser(req: Request, res: Response) {
    let user = await this.validateUser(req.cookies.token, ['User'])
    if (user !== false) {
      this.user.deleteUserbyName(String(user.name))
    }
    user = await this.validateUser(req.cookies.token, ['Admin', 'Moderator'])
    if (user !== false) {
      const data: any = req.body

      if (!data.username) {
        res.status(406).json({
          error: 'Invalid username',
        })
        return
      }

      await this.user.deleteUserbyName(String(data.username))
      res.status(200).json({
        info: 'Deleted a User: ' + data.username,
      })
      return
    }
  }

  private async changeUserPassword(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin', 'Moderator', 'User'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.newpassword) {
      res.status(406).json({
        error: 'Invalid new password',
      })
      return
    }
    if (
      !data.oldpassword ||
      !(await bcrypt.compare(String(data.oldpassword), user.passwdhash))
    ) {
      res.status(406).json({
        error: 'Invalid old password',
      })
      return
    }

    if (
      await this.user.changeUserPasswd(
        String(user.name),
        await this.hashPassword(String(data.newpassword))
      )
    ) {
      res.status(200).json({
        info: 'Password Changed',
      })
      return
    }
    res.status(404).json({
      error: 'didnt change the password',
    })
    return
  }

  private async changeUserName(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin', 'Moderator', 'User'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.newName) {
      res.status(406).json({
        error: 'Invalid newName',
      })
      return
    }

    if (await this.user.changeUserName(String(data.newName), user.name)) {
      res.status(200).json({
        info: 'Name has been changed',
      })
      return
    }
    res.status(404).json({
      error:
        'the provided name didnt check with the layout or probably alredy exists',
    })
    return
  }

  private async Like(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin', 'Moderator', 'User'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.postid) {
      res.status(406).json({
        error: 'Invalid post id',
      })
      return
    }

    if (!(typeof data.like == "boolean")) {
      res.status(406).json({
        error: 'Invalid like',
      })
      return
    }

    if (await this.post.likeOrDislikeAPost(
      String(user.id),
      String(data.postid),
      data.like
    )) {
      res.status(200).json({
        info: 'Success',
      })
      return
    }
    res.status(404).json({
      error: 'Unsuccessful',
    })
  }

  private async commentOnPost(req: Request, res: Response) {
    const user = await this.validateUser(
      req.cookies.token,
      ['Admin', 'Moderator', 'User'],
      res
    )
    if (!user) {
      return
    }

    const data: any = req.body

    if (!data.postid) {
      res.status(406).json({
        error: 'Invalid post id',
      })
      return
    }

    if (!data.text) {
      res.status(406).json({
        error: 'Invalid post id',
      })
      return
    }

    if (
      await this.post.commentOnAPost(
        String(user.id),
        String(data.postid),
        String(data.text)
      )
    ) {
      res.status(200).json({
        info: 'commented',
      })
      return
    }
    res.status(404).json({
      error: 'Failed to comment',
    })
    return
  }

  private async changeComment(req: Request, res: Response) {
    const data: any = req.body

    if (!data.commentid) {
      res.status(406).json({
        error: 'Invalid comment id',
      })
      return
    }

    if (!data.text) {
      res.status(406).json({
        error: 'Invalid comment text',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['User'])
    if (user !== false) {
      const ALL_COMMENTS = await this.post.getAllComments()

      for (let i = 0; i < ALL_COMMENTS.length; i++) {
        const element = ALL_COMMENTS[i];
        
        if (element.userid == user.id) {
          await this.post.changeAComment(String(data.commentid), String(data.text))
          res.status(200).json({
            info: 'changed the comment',
          })
          return
        }
      }
    
      res.status(404).json({
        error: 'Didnt change',
      })
      return
    }
    user = await this.validateUser(req.cookies.token, ['Admin', 'Moderator'])
    if (user !== false) {
      if (await this.post.changeAComment(String(data.commentid), String(data.text))) {
        res.status(200).json({
          info: 'comment Changed',
        })
        return
      }
      res.status(404).json({
        error: 'Didnt change',
      })
      return
    }
  }

  private async deleteComment(req: Request, res: Response) {
    const data: any = req.body

    if (!data.commentid) {
      res.status(406).json({
        error: 'Invalid comment id',
      })
      return
    }

    let user = await this.validateUser(req.cookies.token, ['User'])
    if (user !== false) {
      const ALL_COMMENTS = await this.post.getAllComments()

      for (let i = 0; i < ALL_COMMENTS.length; i++) {
        const element = ALL_COMMENTS[i];
        
        if (element.userid == user.id) {
          await this.post.deleteAComment(String(data.commentid))
          res.status(200).json({
            info: 'deleted the comment',
          })
          return
        }
      }
    
      res.status(404).json({
        error: 'Didnt delete',
      })
      return
    }
    user = await this.validateUser(req.cookies.token, ['Admin', 'Moderator'])
    if (user !== false) {
      if (await this.post.deleteAComment(String(data.commentid))) {
        res.status(200).json({
          info: 'comment deleted',
        })
        return
      }
      res.status(404).json({
        error: 'Didnt delete',
      })
      return
    }
  }

  private async banAUser(req: Request, res: Response) {
    if (
      !(await this.validateUser(
        req.cookies.token,
        ['Admin'],
        res
      ))
    ) {
      return
    }

    const data: any = req.body
    console.log(data);
    if (!data.userid) {
      res.status(406).json({
        error: 'Invalid userid',
      })
      return
    }

    if (!(typeof data.ban == "boolean")) {
      res.status(406).json({
        error: 'Invalid ban',
      })
      return
    }

    if (await this.user.banOrUnbanUser(String(data.userid), data.ban)) {
      res.status(200).json({
        info: 'Un/Banned User',
      })
      return
    }
    res.status(404).json({
      error: 'unsuccessful',
    })
    return

  }

  async changeRoll(req: Request, res: Response) {
    if (
      !(await this.validateUser(
        req.cookies.token,
        ['Admin'],
        res
      ))
    ) {
      return
    }

    const data: any = req.body

    if (!data.name) {
      res.status(406).json({
        error: 'Invalid name',
      })
      return
    }

    if (!data.role) {
      res.status(406).json({
        error: 'Invalid role',
      })
      return
    }

    if (await this.user.changeUserRoll(String(data.name), String(data.role))) {
      res.status(200).json({
        info: 'Changed role',
      })
      return
    }
    res.status(404).json({
      error: 'unsuccessful, role or user does not exist',
    })
    return

  }
}
