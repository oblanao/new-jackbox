import React, { Component } from 'react';

import Landing from './Landing';
import Server from './Server/Server';
import Client from './Client/Client';

import './common/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: <Landing newGame={this.newGame} joinGame={this.joinGame} />
    }
    this.newGame = this.newGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  newGame = () => {
    this.setState({currentView: <Server />});  
  }

  joinGame = () => {
    this.setState({currentView: <Client />});
  }

  render() {
    return (
      <div className='app max-flex-all-center'>
        {this.state.currentView}
      </div>
    );
  }
}

export default App;
