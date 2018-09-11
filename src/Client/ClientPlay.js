import React, { Component } from 'react';

class ClientPlay extends Component {
  componentDidMount() {
    const socket = this.props.socket;
    socket.emit('Clientplay-test');
  }
  render() {
    return(
      <p>ClientPlay component</p>
    )
  }
}

export default ClientPlay;