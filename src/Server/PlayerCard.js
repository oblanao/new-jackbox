import React, { Component } from 'react';

class PlayerCard extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.player.name}</h1>
        <p>{this.props.player.age}</p>
      </div>
    )
  }
}

export default PlayerCard;