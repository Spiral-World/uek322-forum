import express, { Express, Request, Response } from 'express'
import { API } from './api'
import http from 'http'
import { resolve, dirname } from 'path'
import { Database, User, Post } from './database'

// Middleware used to get the request body
import bodyParser from 'body-parser'

// Middleware used for the session token
import cookieParser from 'cookie-parser'

class Backend {
  // Properties
  private _app: Express
  private _database: Database
  private _server: http.Server
  private _API: API

  private _user: User
  private _post: Post

  // Getters
  public get app(): Express {
    return this._app
  }

  public get server(): http.Server {
    return this._server
  }

  public get API(): API {
    return this._API
  }

  public get database(): Database {
    return this._database
  }

  public get user(): User {
    return this._user
  }

  public get post(): Post {
    return this._post
  }

  // Constructor
  constructor() {
    this._app = express()

    // support parsing of application/json type post data
    this._app.use(bodyParser.json())
    //support parsing of application/x-www-form-urlencoded post data
    this._app.use(bodyParser.urlencoded({ extended: true }))

    /*
    this._app.use(function (req, res) {
      //res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
      //res.setHeader('X-Content-Type-Options', 'none')

      //res.end(JSON.stringify(req.body, null, 2))
    })
    */

    this._app.use(cookieParser())

    this._server = http.createServer(this.app)
    this._database = new Database()

    this._user = new User(this._database)
    this._post = new Post(this._database)

    this._API = new API(this._app, this._user, this._post)

    this.setupStaticFiles()
    this.setupRoutes()
    this.startServer()
  }

  // Methods
  private setupStaticFiles(): void {
    this._app.use(express.static('client'))
  }

  private setupRoutes(): void {
    this._app.get('/', (req: Request, res: Response) => {
      const __dirname = resolve(dirname(''))
      res.sendFile(__dirname + '/client/HTML/index.html')
    })
  }

  /*
  private downloader(): void {
    this._app.get('/Download', (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
      const __dirname = resolve(dirname(''))
      res.sendFile(__dirname + '/client/HTML/index.html')
    })
  }
  */

  private startServer(): void {
    this._server.listen(4200, () => {
      console.log('Server is listening!')
    })
  }
}

const backend = new Backend()
export const viteNodeApp = backend.app

