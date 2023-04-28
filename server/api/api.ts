import { Request, Response, Express } from 'express'
import { User } from '../database'

import jwt from 'jsonwebtoken';
import { sign, verify } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';

export class API {
  // Properties
  app: Express
  private user: User

  private SECRET: string = "FAKE_SECRET";

  // Constructor
  constructor(app: Express, User: User) {
    this.app = app;
    this.user = User;

    this.app.get('/api/Healthcheck', (req: Request, res: Response) => res.status(200).send('Alive'));

    this.app.post('/api/Login', this.login)
    this.app.post('/api/Register', this.register)
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  // JWT
  createToken(id) {
    const token = jwt.sign({ id }, this.SECRET, {
      expiresIn: 7200000,
    });
    return token;
  };
  
  // Methods
  private async login(req: Request, res: Response) {
    try {

      const aUser = await this.user.getOneUsers(req.body.email);

      if (!aUser && aUser.passwdhash == this.hashPassword(req.body.password)) {

      }

    } catch(e) {
      console.log(e)
    }
    console.log(req.body)
    res.status(200).json(req.body)
    /*
    req.body.password

    const aUser = await this.user.getOneUsers(req.body.email);
    if (aUser.passwdhash = password) {

    }

    this.createToken(name)
    */
  }

  private async register(req: Request, res: Response) {
    req.body.email
    req.body.password
    req.body.name
    req.body.role
    res.send('Hello There!')
  }

  async deleteUser() {

  }


}
