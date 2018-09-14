import React, { Component } from 'react';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
      playerName: ''
    }
    this.tryToJoin = this.tryToJoin.bind(this);
  }

  componentDidMount() {
    const socket = this.props.socket;
    // Event listeners
    socket.on('wrongRoomCode', this.wrongRoomCode);
    socket.on('duplicatePlayerName', this.duplicatePlayerName);
    socket.on('joinCorrect', this.joinCorrect);
    socket.on('roomDeleted', this.roomDeleted);

    window.addEventListener('unload', this.windowUnload);
  }

  tryToJoin() {
    const socket = this.props.socket;
    const roomCode = this.state.roomCode;
    const playerName = this.state.playerName;
    socket.emit('userTriesToJoin', ({roomCode, playerName}));
  }

  wrongRoomCode = (roomCode) => {
    alert(`wrong roomCode = ${roomCode}`);
  }

  duplicatePlayerName = (playerName) => {
    alert(`wrong playerName = ${playerName}`)    
  }

  joinCorrect = (data) => {
    this.props.nextView();
  }

  updateRoomCode(evt) {
    this.setState({
      roomCode: evt.target.value
    });
  }

  updatePlayerName(evt) {
    this.setState({
      playerName: evt.target.value
    });
  }
  roomDeleted = () => {
    alert('room deleted!');
    window.location.reload(true);
  }

  windowUnload = () => {
    this.props.socket.emit('userDisconnect', this.state.roomCode);
  }
  render() {
    return (
      <div>
        <p>Client</p>
        <input type="text" value={this.state.inputValue} onChange={evt => this.updateRoomCode(evt)} />
        <input type="text" value={this.state.playerName} onChange={evt => this.updatePlayerName(evt)} />
        <button onClick={this.tryToJoin}>Submit!</button>
      </div>
    )
  }
}

export default Client;