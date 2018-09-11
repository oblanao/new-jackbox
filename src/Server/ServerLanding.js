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
  render() {
    return (
      <div className='server-landing'>
        <p>Server</p>
        <p>{this.state.roomCode}</p>
        {this.state.players.map((player) => {
          return <PlayerCard key={player.key} player={player} />
        })}
      </div>
    )
  }
}

export default ServerLanding;