/* jshint esversion: 6 */
import React, { Component } from 'react';
import io from 'socket.io-client';

class Remote extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      room: '42',
      socket: {}
    }

    this.playPause = this.playPause.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  componentDidMount() {
    this.setState({
      socket: io('http://localhost:3001')
    })
  }

  joinRoom() {
    const { socket } = this.state;
    
    socket.emit('joinRoom', 'aQui') // TODO replace 'aQui' with user input
    this.setState({
      room: 'aQui'
    });
  }

  playPause() {
    const { socket, room } = this.state;
    const PLAY_PAUSE = ' ';

    socket.emit('command', room, PLAY_PAUSE);
    console.log('remote: play/pause');
  }

  render() {
    return (
    <div>
      <div onClick={this.joinRoom}><h2>Join</h2></div>
      <div className="play/pause" id="remote" onClick={this.playPause}><h1>Play / Pause</h1></div>
    </div>
    ) 

  }
}

export default Remote;