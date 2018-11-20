/* jshint esversion: 6 */
import React, { Component } from 'react';
import io from 'socket.io-client';

class Remote extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      timestamp: null,
    }

    this.playPause = this.playPause.bind(this);
  }

  componentDidMount() {
    const socket = io('http://localhost:3001');

    const cb = ((err, timestamp) => this.setState({ 
      timestamp 
    }, console.log(`time: ${timestamp}`)));

    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }

  playPause() {
    this.props.handleClick(' ');
    console.log('play/pause');
  }


  render() {
    return (
      <div className="play/pause" id="remote" onClick={this.playPause}><h1>Play / Pause</h1></div>
    ) 

  }
}

export default Remote;