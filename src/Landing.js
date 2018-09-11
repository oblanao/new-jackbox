import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return(
      <div>
        <p onClick={this.props.newGame}>New game</p>
        <p onClick={this.props.joinGame}>Join game</p>
      </div>
    )
  }
}

export default Landing;