// Object with all current games
const allGames = {}

// Helper functions
const roomCodeExists = (roomCode) => {
  return allGames.hasOwnProperty(roomCode);
}

const randomLetter = () => {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
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

const prettyPrint = (item) => {
  if (typeof item === 'object') {
    let objectPrint = Object.create(null);
    let singleObject = false;
    for (key in item) {
      if (key === 'name') {
        singleObject = true
      }
    }
    if (singleObject) {
      for (key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === 'socket') {
            objectPrint[key] = '[Socket Object]';
          } else {
            objectPrint[key] = item[key];
          }
        }
      }
    } else {
      for (player in item) {
        if (item.hasOwnProperty(player)) {
          objectPrint[player] = Object.create(null);
          for (key in item[player]) {
            if (key === 'socket') {
              objectPrint[player][key] = '[Socket Object]';
            } else {
              objectPrint[player][key] = item[player][key];
            }
          }
        }
      }
    }
    console.log(objectPrint);
  } else {
    return false;
  }
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
    this.players[clientName] = {
      name: clientName,
      socket,
      active: true,
      stage: 0
    }
    // Emit to client that joined, to change HTML
    this.emitToClient(clientName, 'joinCorrect');
    // Emit ping, event 'ping' is probably reserved (buggy)
    this.emitToClient(clientName, 'goPing', Date.now());
    // Emit to server that new user joined
    this.emitToServer('playerJoined', clientName);
  }
  this.resumeClient = (socket, clientName) => {
    this.players[clientName].active = true;
    this.players[clientName].socket = socket;
    this.emitToServer('playerJoined', this.players[clientName]);
    this.emitToClient(clientName, 'updateStage', this.players[clientName].stage);
  }
  this.removeClient = (socket) => {
    let playerName = this.getPlayerName(socket);
    this.players[playerName].active = false;
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
  roomCodeExists,
  prettyPrint
}