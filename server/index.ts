import express, { Express, Request, Response } from 'express'
// { WebSocketServer } from './websocketserverdirectory'
import { API } from './api'
import http from 'http'
import { resolve, dirname } from 'path'
import { Database, User } from './database'

class Backend {
  // Properties
  private _app: Express
  //private _WebSocketServer: WebSocketServer
  private _database: Database
  private _env: string
  private _server: http.Server
  private _API: API

  private _user: User
  private _post

  // Getters
  public get app(): Express {
    return this._app
  }

  public get server(): http.Server {
    return this._server
  }
/*
  public get webSocketServer(): WebSocketServer {
    return this._WebSocketServer
  }
*/
  public get API(): API {
    return this._API
  }

  public get database(): Database {
    return this._database
  }

  // Constructor
  constructor() {
    this._app = express()
    this._app.use(express.json());
    this._server = http.createServer(this.app);
    this._database = new Database()
    //this._WebSocketServer = new WebSocketServer(this._server)
    this._API = new API(this._app, this._user)
    this._env = process.env.NODE_ENV || 'development'

    new User(this._database)

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
      res.sendFile(__dirname + '/client/index.html')
    })
  }

  private startServer(): void {
    if (this._env === 'production') {
      this._server.listen(3000, () => {
        console.log('Server is listening!')
      })
    }
  }
}

const backend = new Backend()
export const viteNodeApp = backend.app
