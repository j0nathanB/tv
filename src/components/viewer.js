import React, { Component } from 'react';
import television from '../assets/tv.png'

class Viewer extends Component {
  
  render() {
    const { isConnected } = this.props;
    const codeStyle = isConnected ? "room-code room-code-active" : "room-code" 
    console.log(isConnected, codeStyle)
    return (
      <div>
        <h1 className={codeStyle}>{this.props.roomId}</h1>
        <div className="viewer">
          <img className="television" alt="television" src={television} />
          <div className="iframe" id="player" />
        </div>
      </div>
    ) 
  }
}

export default Viewer;