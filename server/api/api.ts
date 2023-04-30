import { Request, Response, Express } from 'express'
import { User, Post } from '../database'

import { sign, verify } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export class API {
  // Properties
  app: Express
  private user: User
  private post: Post

  private SECRET: string = /* String(process.env.TOKEN_SECRET) |*/ 'FAKE_SECRET'

  // Constructor
  constructor(app: Express, user: User, post: Post) {
    this.app = app
    this.user = user
    this.post = post

    this.app.get('/api/Healthcheck', (req: Request, res: Response) =>
      res.status(200).send('Alive')
    )

    this.app.post('/api/Login', this.login)
    this.app.post('/api/Register', this.register)

    this.app.get('/api/AllPosts', this.getAllPosts)
  }

  async validateUser(
    token: string,
    privliges: string[],
    res
  ): Promise<object | void> {
    let id = verify(token, this.SECRET)

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
    console.log(password)
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const hash = await bcrypt.hash(password, salt)
    console.log(hash)
    return hash
  }

  // Methods
  private async login(req: Request, res: Response) {
    try {
      const aUser = await this.user.getOneUsers(req.body.email)

      if (!aUser && aUser.passwdhash == this.hashPassword(req.body.password)) {
        res.status(200).json({
          error: 'Invalid name and password',
        })
      }

      const token = sign({ id: aUser.id }, this.SECRET, {
        expiresIn: '5h',
      })

      res.cookie('token', token, {
        httpOnly: true
      })

      res.status(200).json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        error: 'Invalid name and password',
      })
    }
  }

  private async register(req: Request, res: Response) {
    try {
      /*
      const hashPWD = await this.hashPassword(req.body.password);
      res.status(200).json({
        thing: hashPWD
      })
      */
      if (
        await this.user.register(
          req.body.name,
          req.body.email,
          req.body.password,
          req.body.role
        )
      ) {
        res.status(200).json({
          info: 'Succesfuly Registerd',
        })
      }
      res.status(400).json({
        error: 'Unable to Registerd',
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({
        error: 'Invalid Data',
      })
    }
  }

  private async getAllPosts(req: Request, res: Response) {
    await this.validateUser(req.cookies.token, ["Admin", "Moderator", "User"], res)
    res.status(400).json(this.post.getAllPosts())
  }

  private async deleteUser(req: Request, res: Response) {}
}
