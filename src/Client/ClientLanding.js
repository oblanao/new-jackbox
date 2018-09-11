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
    socket.on('joinCorrect', this.joinCorrect)
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
    alert(`correct roomCode!`);
  }

  updateroomCode(evt) {
    this.setState({
      roomCode: evt.target.value
    });
  }

  updateNameValue(evt) {
    this.setState({
      playerName: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <p>Client</p>
        <input type="text" value={this.state.inputValue} onChange={evt => this.updateroomCode(evt)} />
        <input type="text" value={this.state.playerName} onChange={evt => this.updateNameValue(evt)} />
        <button onClick={this.tryToJoin}>Submit!</button>
      </div>
    )
  }
}

export default Client;