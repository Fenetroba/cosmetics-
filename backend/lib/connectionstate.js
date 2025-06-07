import mongoose from 'mongoose';

class ConnectionState {
  constructor() {
    this.isConnected = false;
    this.connection = null;
  }

  setConnected(connection) {
    this.isConnected = true;
    this.connection = connection;
  }

  setDisconnected() {
    this.isConnected = false;
    this.connection = null;
  }

  getConnection() {
    return this.connection;
  }

  isConnected() {
    return this.isConnected;
  }
}

const connectionState = new ConnectionState();

export default connectionState; 