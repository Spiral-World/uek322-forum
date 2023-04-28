import { Request, Response, Express } from 'express'
import { User } from '../database'

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

export class API {
  // Properties
  app: Express
  private user: User

  private SECRET: string = "FAKE_SECRET";

  // Constructor
  constructor(app: Express, User: User) {
    this.app = app
    this.user = User
    this.app.get('/Login', this.login)
    this.app.get('/Register', this.register)
  }

  // Methods
  private async login(req: Request, res: Response) {
    req.body.password

    const aUser = await this.user.getOneUsers(req.body.email);

    if (aUser.passwdhash = password) {

    }
    
    this.createToken(name)
    res.status(200).json()
  }

  private async register(req: Request, res: Response) {
    req.body.email
    req.body.password
    req.body.name
    req.body.role
    res.send('Hello There!')
  }

  // JWT
  createToken(id) {
    const token = jwt.sign({ id }, this.SECRET, {
      expiresIn: 7200000,
    });
    return token;
  };
}
