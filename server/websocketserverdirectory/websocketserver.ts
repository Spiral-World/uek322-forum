//SOURCE: https://typescript.helpful.codes/tutorials/express/Using-WebSocket-with-Express/

import expressWs from 'express-ws';
import WebSocket from 'ws';

export class WebSocketServer {
  // Properties
  private _websocketServer: wsApp

  // all connected users to the server
  private global_counter: number = 0
  private all_active_connections = {}

  // Constructor
  constructor(app) {
    this._websocketServer = expressWs(app);

    this._websocketServer.app.ws('/ws', this.onConnection)
  }
  // Methods

  onConnection(ws: WebSocket) {
    // all users that are connected to ws will get added to the list
/*
    let id = this.global_counter++
    this.all_active_connections[id] = ws
    ws.id = id
*/
    //
    ws.on('message', (message: string) => {
      console.log(`received message: ${message}`)

      ws.send(`you said: ${message}`)
    })

    ws.on('close', () => {
/*
      delete this.all_active_connections[ws.id]
*/
    })
  }




}
