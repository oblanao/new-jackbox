import React, { Component } from 'react';

class ServerPlay extends Component {
  componentDidMount() {
    const socket = this.props.socket;
    
  }
  render() {
    return(
      <p>ServerPlay component</p>
    )
  }
}

export default ServerPlay;