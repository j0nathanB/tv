import React, { Component } from 'react';

class Viewer extends Component {
  render() {
    const { isConnected } = this.props;

    return (
      <div>
        <div className="viewer">
        
          <div className="television" />

          {isConnected ? null : (<div className="instructions">
            <p>Instructions: </p>
            <p>1. Open highlandtv.net on a mobile device. </p>
            <p>2. Enter this code: <span className="room-code">{this.props.roomId}</span></p>
            <p>3. Enjoy the show!</p>
          </div>)}

          <div className="iframe" id="player"/>
          
        </div>
      </div>
    ) 
  }
}

export default Viewer;