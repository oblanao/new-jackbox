import React, { Component } from 'react';

import '../common/loading.css';

class ServerLoading extends Component {
  componentDidMount() {
    setTimeout(() => {
      console.log('timeout!');
      this.props.nextView();
    }, 2500)
  }
  render() {
    return(
      <div className='spinner'></div>
    )
  }
}

export default ServerLoading;