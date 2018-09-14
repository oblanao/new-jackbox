import React, { Component } from 'react';

class PlayerCard extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.player}</h1>
      </div>
    )
  }
}

export default PlayerCard;