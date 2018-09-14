import React, { Component } from 'react';

import '../common/main.css';

class PlayerCard extends Component {
  render() {
    return (
      <div className='player-card'>
        <h1>{this.props.player}</h1>
      </div>
    )
  }
}

export default PlayerCard;