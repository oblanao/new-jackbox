/* 
  Purpose of component: Controller component => render views depending on stage of game
    1. ServerLanding --> Shows RoomCode and PlayerCard for every player that has joined
    2. ServerLoading --> Shows Loading screen while assets are transferred
    3. ServerPlay    --> Shows The Game, as it progresses

    All components will need socket and nextView props. Maybe React.Context is a better option
*/


import React, { Component } from 'react';
import ServerLanding from './ServerLanding';
import ServerLoading from './ServerLoading';
import ServerPlay from './ServerPlay';

import { socket } from '../common/api';

import '../common/main.css';

class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      view: <ServerLanding socket={socket} nextView={this.nextView} />
    }
    this.nextView = this.nextView.bind(this);
  }

  nextView = () => {
    const views = [
      <ServerLanding socket={socket} nextView={this.nextView} />,
      <ServerLoading socket={socket} nextView={this.nextView} />,
      <ServerPlay socket={socket} nextView={this.nextView} />
    ];
    const newStage = this.state.stage + 1;
    const newView = views[newStage];
    this.setState({
      stage: newStage,
      view: newView
    });
  }

  render() {
    return (
      <div className='max-flex-all-center'>
        {this.state.view}
      </div>
    )
  }
}

export default Server;