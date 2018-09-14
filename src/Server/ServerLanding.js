import React, { Component } from 'react';

import PlayerCard from './PlayerCard';

import '../common/main.css';

class ServerLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
      players: []
    }
    // Send request for new roomCode
    this.props.socket.emit('getRoomCode');
  }

  componentDidMount() {
    const socket = this.props.socket;
    // Event listeners
    socket.on('newRoomCode', this.newRoomCode);
    socket.on('landingPlayersChange', this.landingPlayersChange);
    socket.on('playerJoined', this.playerJoined);
    socket.on('playerLeft', this.playerLeft);
    window.addEventListener('unload', this.windowUnload);
  }

  newRoomCode = (roomCode) => {
    this.setState({ roomCode });
  }
  landingPlayersChange = (newPlayersArray) => {
    let currentPlayers = newPlayersArray.slice();
    this.setState({
      players: currentPlayers
    });
  }
  playerJoined = (newUser) => {
    let currentPlayers = this.state.players;
    currentPlayers.push(newUser);
    this.setState({
      players: currentPlayers
    });
  }
  playerLeft = (player) => {
    let players = this.state.players;
    let index = players.indexOf(player);
    players.splice(index, 1);
    this.setState({
      players
    });
  }
  windowUnload = () => {
    this.props.socket.emit('userDisconnect', this.state.roomCode);
  }

  render() {
    return (
      <div className='server-landing'>
        <p>Server</p>
        <p>{this.state.roomCode}</p>
        {this.state.players.map((player) => {
          return <PlayerCard key={`player-${player}`} player={player} />
        })}
      </div>
    )
  }
}

export default ServerLanding;