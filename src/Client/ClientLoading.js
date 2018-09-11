import React, { Component } from 'react';

import '../common/loading.css';

class ClientLoading extends Component {
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

export default ClientLoading;