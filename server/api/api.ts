import { Request, Response, Express } from 'express'
import { User, Post } from '../database'

import { sign, verify } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

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

    this.app.post('/api/Login', this.login.bind(this))
    this.app.post('/api/Register', this.register.bind(this))

    this.app.get('/api/AllPosts', this.getAllPosts.bind(this))
  }

  async validateUser(
    token: string,
    privliges: string[],
    res
  ): Promise<object | void> {
    let id = verify(token, this.SECRET)

    console.log(id)

    const aUser = await this.user.getOneUserbyId(id)

    for (let i = 0; i < privliges.length; i++) {
      const element = privliges[i]
      if (aUser.role == element) {
        return aUser
      }
    }
    res.status(403).json({
      error: 'You Are Not alowed to do this',
    })
  }

  //await this.validateUser(req.cookies.token, ["Admin", "Moderator", "User"], res)

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  // Methods
  private async login(req: Request, res: Response) {
    try {
      const aUser = await this.user.getOneUserbyMail(req.body.email)

      if (!aUser && aUser.passwdhash == this.hashPassword(req.body.password)) {
        res.status(200).json({
          error: 'Invalid name and password',
        })
        return;
      }
      const token = sign({ id: aUser.id }, this.SECRET, {
        expiresIn: '5h',
      })

      res.cookie('token', token, {
        httpOnly: true
      })

      res.status(200).json({
        info: "Successfuly created Token"
      })
    } catch (e) {
      console.log(e)
      res.status(500)
    }
  }

  private async register(req: Request, res: Response) {
    try {
      const data: object = req.body
      
      const hashPWD: string = await this.hashPassword(data.password);
      
      if (
        await this.user.register(
          data.name,
          data.email,
          hashPWD,
          data.role
        )
      ) {
        res.status(200).json({
          info: 'Succesfuly Registerd',
        })
        return;
      }
      res.status(400).json({
        error: 'Unable to Registerd',
      })
      return;
    } catch (e) {
      console.log(e)
      res.status(500)
    }
  }

  private async getAllPosts(req: Request, res: Response) {
    //await this.validateUser(req.cookies.token, ["Admin", "Moderator", "User"], res)
    res.status(200).json(await this.post.getAllPosts())
  }

  private async deleteUser(req: Request, res: Response) {}
}
