export class WebSocketConnector {
  private connection?: WebSocket;
  private url?: string;

  getConnection(url: string): WebSocket {
    if (url !== this.url) {
      if (this.connection) {
        this.connection.close();
      }

      this.url = url;
      this.connection = new WebSocket(this.url);
    }

    return this.connection as WebSocket;
  }
}
