//SOURCE: https://typescript.helpful.codes/tutorials/express/Using-WebSocket-with-Express/
/*
import * as WebSocket from 'ws';

const jwt = require("jsonwebtoken");

export class WebSocketServer {
  // Properties
  private _websocketServer: WebSocket

  private SECRET: string = "FAKE_SECRET";

  // all connected users to the server
  private global_counter: number = 0
  private all_active_connections = {}

  // Constructor
  constructor(server) {
    /*
    this._websocketServer = new WebSocket.Server({ server });

    //this._websocketServer.app.use(express.static('public'));

    //console.log(express.static('public'))
    
    this._websocketServer.on('connection', this.onConnection)

    //this._websocketServer.app.on('connection', this.onConnection)
    */
   /*
  }
  // Methods

  onConnection(ws: WebSocket) {

    console.log("hello")
    
    // all users that are connected to ws will get added to the list
    let id = this.global_counter++
    this.all_active_connections[id] = ws
    ws.id = id
    //
    ws.on('message', (message: string) => {
      console.log(`received message: ${message}`)



      ws.send(`you said: ${message}`)
    })

    ws.on('close', () => {
      delete this.all_active_connections[ws.id]
    })
  }


  validateToken(token) {
    try {
      let verifiedtoken = jwt.verify(token, SECRET);
      return verifiedtoken;
    } catch (e) {
      console.log(e)
    }
  };

}
*/