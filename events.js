const { allGames, Game, newRoomCode, prettyPrint, roomCodeExists } = require('./Game');

const events = {
  getRoomCode: (socket) => {
    const roomCode = newRoomCode();
    // Instantiate game
    allGames[roomCode] = new Game(roomCode, socket);
    // Send roomCode to Frontend
    socket.emit('newRoomCode', roomCode);
  },
  userTriesToJoin: (socket, data) => {
    const roomCode = data.roomCode;
    const playerName = data.playerName;
    // If the roomcode does not exist
    if (!roomCodeExists(roomCode)) {
      socket.emit('wrongRoomCode', roomCode);
    } else { // If game with roomcode exists
      var game = allGames[roomCode];
      if (game.playerExists(playerName)) {
        socket.emit('duplicatePlayerName', (playerName));
      } else {
        // Add client to Room. This will also emit correct events to server and self
        game.addClient(socket, playerName);
      }
    }
  },
  userDisconnect: (socket, roomCode) => {
    let game = allGames[roomCode];
    if (game) {
      // If server disconnects
      if (game.isServer(socket)) {
        game.destroy(); // Will also emit to all clients that room is deleted
      } else {
        game.removeClient(socket); // Will also emit to server that user left;
      }
    }
  },
  // event ping is probably reserved
  goPong: (socket, latency, roomCode) => {
    let game = allGames[roomCode];
    if (game) {
      let playerName = game.getPlayerName(socket);
      game.players[playerName].latency = latency;
      prettyPrint(game.players);
    }
  }
}

module.exports = {
  events
}