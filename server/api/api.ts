import { Request, Response, Express } from 'express'
import { User, Post } from '../database'

import { sign, verify } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

interface AUser {
  id: number,
  name: string,
  passwdhash: string,
  roll: string
}

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
    this.app.post('/api/Register', this.register.bind(this))
    this.app.put('/api/UserName', this.changeUserName.bind(this))
    this.app.put('/api/UserPWD', this.changeUserPassword.bind(this))
    this.app.delete('/api/User', this.deleteUser.bind(this))
    this.app.get('/api/AllUser', this.getAllUsers.bind(this))
    this.app.get('/api/WhoAmI', this.whoAmI.bind(this))
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
    res
  ): Promise<object | boolean> {
    try {
      let id = await verify(token, this.SECRET).id

      const aUser = await this.user.getOneUserbyId(String(id))

      console.log(aUser, aUser[0].ban)
  
      if (aUser[0].ban == 1) {
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
      res.status(403).json({
        error: 'You Are Not alowed to do this',
      })
      return false
    } catch(e) {
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

  private async login(req: Request, res: Response) {
    try {
      const data: any = req.body

      if (!data.name) {
        res.status(401).json({
          error: 'Invalid name',
        })
        return;
      }
      if (!data.password) {
        res.status(401).json({
          error: 'Invalid password',
        })
        return;
      }

      const aUser: Array<AUser> = await this.user.getOneUserbyName(data.name)
      
      if (
        aUser.length == 0 ||
        !(await bcrypt.compare(data.password, aUser[0].passwdhash))
      ) {
        res.status(200).json({
          error: 'Invalid name and password',
        })
        return;
      }

      const USER_ID = aUser[0].id

      const token = sign({ id: USER_ID }, this.SECRET, {
        expiresIn: '5h',
      })

      res.cookie('token', token, {
        httpOnly: true,
      })

      console.log(`UserID: ${USER_ID} Logged In`)

      res.status(200).json({
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

      if (!data.role) {
        res.status(401).json({
          error: 'Invalid role',
        })
        return;
      }
      if (!data.name) {
        res.status(401).json({
          error: 'Invalid name',
        })
        return;
      }
      if (!data.password) {
        res.status(401).json({
          error: 'Invalid password',
        })
        return;
      }

      const hashPWD: string = await this.hashPassword(data.password)

      if (await this.user.register(data.name, hashPWD, data.role)) {
        res.status(200).json({
          info: 'Succesfuly Registerd',
        })
        return
      }
      res.status(400).json({
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
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }
    
    res.status(200).json(await this.post.getAllPosts())
  }

  private async createPost(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

    const data: any = req.body

    if (!data.name) {
      res.status(401).json({
        error: 'Invalid name',
      })
      return;
    }

  }

  private async deletePost(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async changePost(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async myPosts(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async getAllUsers(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async whoAmI(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async deleteUser(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async changeUserPassword(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async changeUserName(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async Like(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async commentOnPost(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async changeComment(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async deleteComment(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

  private async banAUser(req: Request, res: Response) {
    if (!await this.validateUser(req.cookies.token, ['Admin', 'Moderator', 'User'], res)) {
      return;
    }

  }

}
