// Object with all current games
const allGames = {}

// Helper functions
const roomCodeExists = (roomCode) => {
  return allGames.hasOwnProperty(roomCode);
}

const randomLetter = () => {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random()*alphabet.length)];
}

const newRoomCode = () => {
  do {
    // cannot declare roomCode as let, because its not in scope of while (roomCodeExists(roomCode))
    var roomCode = '';
    for (let i = 0; i < 4; i++) {
      roomCode += randomLetter();
    }
  } while (roomCodeExists(roomCode))
  return roomCode;
}

// Game constructor
function Game(roomCode, socket) {
  this.roomCode = roomCode;
  this.serverSocket = socket;
  // this.clientSockets = {};  // Will be { 'playerName': {Socket} }
  this.players = {}; // Will contain playerNames associated with socket
  // Methods
  this.getPlayerName = (socket) => {
    for (player in this.players) {
      if (this.players[player].socket && this.players[player].socket.id === socket.id) {
        return this.players[player].name;
      }
    }
    return false;
  }

  this.getSocket = (playerName) => {
    return this.players[playerName].socket;
  }

  this.playerExists = (playerName) => {
    return this.players.hasOwnProperty(playerName);
  }
  this.emitToServer = (event, data) => {
    console.log(`emitToServer with args = event: ${event}, data: ${data}`)
    this.serverSocket.emit(event, data);
  }
  this.emitToAllClients = (event, data) => {
    for (player in this.players) {
      this.players[player].socket.emit(event, data);
    }
  }
  this.emitToClient = (clientName, event, data) => {
    this.players[clientName].socket.emit(event, data);
  }
  this.addClient = (socket, clientName) => {
    console.log(`we are inside addClient`);
    this.players[clientName] = {
      name: clientName,
      socket
    }
    // Emit to server that new user joined
    this.emitToServer('playerJoined', clientName);
    // Emit to client that joined, to change HTML
    this.emitToClient(clientName, 'joinCorrect');
  }
  this.removeClient = (socket) => {
    let playerName = this.getPlayerName(socket);
    console.log(playerName);
    delete this.players[playerName];
    this.emitToServer('playerLeft', playerName);
  }
  this.isServer = (socket) => socket === this.serverSocket
  this.destroy = () => {
    delete allGames[this.roomCode];
    this.emitToAllClients('roomDeleted');
  }
}

module.exports = {
  allGames,
  Game,
  newRoomCode,
  roomCodeExists
}