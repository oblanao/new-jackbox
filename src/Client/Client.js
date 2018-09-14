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
      roomCode: '',
      stage: 0,
      view: <ClientLanding socket={socket} nextView={this.nextView} setRoomCode={this.setRoomCode} />
    }
    this.nextView = this.nextView.bind(this);
    this.setRoomCode = this.setRoomCode.bind(this);
  }
  componentDidMount() {
    socket.on('updateStage', (newStage) => {
      this.nextView(newStage);
    });
  }
  setRoomCode = (roomCode) => {
    this.setState({
      roomCode
    });
  }
  nextView = (viewNr) => {
    const views = [
      <ClientLanding socket={socket} nextView={this.nextView} setRoomCode={this.setRoomCode}/>,
      <ClientLoading socket={socket} nextView={this.nextView} />,
      <ClientPlay socket={socket} nextView={this.nextView} />
    ];
    if (viewNr) {
      let newStage = viewNr;
      let newView = views[newStage];
      this.setState({
        stage: newStage,
        view: newView
      });
    } else {
      const newStage = this.state.stage + 1;
      const newView = views[newStage];
      this.setState({
        stage: newStage,
        view: newView
      });
      socket.emit('newStage', {roomCode: this.state.roomCode, newStage});
    }
  }

  render() {
    return (
      <div className='max-flex-center-h'>
        {this.state.view}
      </div>
    )
  }
}

export default Client;