/* jshint esversion: 6 */
import React, { Component } from 'react';
import television from '../assets/tv.png'
import io from 'socket.io-client';

class Viewer extends Component {
  componentDidMount() {
    console.log('viewer mounted')
    const socket = io('http://localhost:3001');

    //const cb = (err, data) => console.log(`viewer: ${data}`);

    socket.on('cmd', (cmd) => {console.log('viewer: ', cmd)});
    //socket.emit('subscribeToTimer', 1000);
  }

  render() {
    return (
      <div><img className="television" alt="television" src={television} />
      <div className="viewer" id="player"></div></div>
    ) 

  }
}

export default Viewer;