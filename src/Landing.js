import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './common/main.css';

class Landing extends Component {
  render() {
    return (
      <div className='center-items'>
        <h1 className='main-header'>Jack or Whatever Box</h1>
        <Button
          onClick={this.props.newGame}
          variant={'outlined'}
          color={'primary'}>
        New game
        </Button>
        <div className='divider'></div>
        <Button 
        onClick={this.props.joinGame}
        variant={'outlined'}
        color={'primary'}>
        Join game
        </Button>
      </div>
    )
  }
}

export default Landing;