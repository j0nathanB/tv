/* jshint esversion: 6 */
import React, { Component } from 'react';
import io from 'socket.io-client';

class Remote extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      command: null,
    }

    this.playPause = this.playPause.bind(this);
  }

  componentDidMount() {
    this.setState({
      socket: io('http://localhost:3001')
    })
  }

  playPause() {
    this.props.handleClick(' ');
    this.setState({
      command: 'play/pause'
    }, () => this.state.socket.emit('command', this.state.command));
    
    console.log('remote: play/pause');
  }


  render() {
    return (
      <div className="play/pause" id="remote" onClick={this.playPause}><h1>Play / Pause</h1></div>
    ) 

  }
}

export default Remote;