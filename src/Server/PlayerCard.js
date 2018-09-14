import React, { Component } from 'react';

import '../common/main.css';

class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }
  }
  render() {
    return (
      <div className='player-card'>
        <h1>{this.props.player}</h1>
        <img className='player-card' src={this.state.avatarSrc} alt={`${this.props.player}-avatar`}/>
      </div>
    )
  }
}

export default PlayerCard;