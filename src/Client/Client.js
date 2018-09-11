/* Purpose of component: Controller component => render views depending on stage of game
    1. ClientLanding --> Shows RoomCode and PlayerCard for every player that has joined
    2. ClientLoading --> Shows Loading screen while assets are transferred
    3. ClientPlay    --> Shows The Game, as it progresses

    All components will need socket and nextView props. Maybe React.Context is a better option
*/


import React, { Component } from 'react';
import ClientLanding from './ClientLanding';
import ClientLoading from './ClientLoading';
import ClientPlay from './ClientPlay';

import { socket } from '../common/api';

import '../common/main.css';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      view: <ClientLanding socket={socket} nextView={this.nextView} />
    }
    this.nextView = this.nextView.bind(this);
  }

  nextView = () => {
    const views = [
      <ClientLanding socket={socket} nextView={this.nextView} />,
      <ClientLoading socket={socket} nextView={this.nextView} />,
      <ClientPlay socket={socket} nextView={this.nextView} />
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

export default Client;