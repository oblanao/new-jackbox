import React, { Component } from 'react';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
      playerName: '',
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
    socket.on('goPing', this.goPing);
    window.addEventListener('unload', this.windowUnload);
  }

  tryToJoin() {
    const socket = this.props.socket;
    const roomCode = this.state.roomCode;
    const playerName = this.state.playerName;
    socket.emit('userTriesToJoin', ({ roomCode, playerName }));
  }

  wrongRoomCode = (roomCode) => {
    alert(`wrong roomCode = ${roomCode}`);
  }

  duplicatePlayerName = (playerName) => {
    alert(`wrong playerName = ${playerName}`)
  }

  joinCorrect = () => {
    this.props.setRoomCode(this.state.roomCode);
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
  goPing = (startTime) => {
    let latency = Date.now() - startTime;
    this.setState({
      ping: latency
    });
    console.log(latency, 'latency');
    this.props.socket.emit('goPong', latency, this.state.roomCode);
  }
  windowUnload = () => {
    this.props.socket.emit('userDisconnect', this.state.roomCode);
  }
  render() {
    return (
      <div className='client-landing'>
        <h1 className='main-header'>Jack or Whatever Box</h1>
        <Input
          placeholder="ROOMCODE"
          value={this.state.roomCode}
          onChange={evt => this.updateRoomCode(evt)}
        />
        <br/>
        <Input
          placeholder="NAME"
          value={this.state.playerName}
          onChange={evt => this.updatePlayerName(evt)}
        />
        <br/>
        <Button 
          onClick={this.tryToJoin}
          variant={'outlined'}>
        Submit!
        </Button>
      </div>
    )
  }
}

export default Client;