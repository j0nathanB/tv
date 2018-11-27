import React, { Component } from 'react';
import television from '../assets/tv.png'

class Viewer extends Component {
  render() {
    return (
      <div>
        <h1 className="room-code">{this.props.roomId}</h1>
        <img className="television" alt="television" src={television} />
      <div className="viewer" id="player"></div></div>
    ) 
  }
}

export default Viewer;