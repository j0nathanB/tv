import React, { Component } from 'react';
import television from '../assets/tv.png'
import tvStatic from '../assets/tv_static.gif'

class Viewer extends Component {
  
  render() {
    const { isConnected } = this.props;
    const codeStyle = isConnected ? "room-code room-code-active" : "room-code" 
    const tvImage = isConnected 
      ? null
      : <img className="static" alt="static" src={tvStatic} /> 


    return (
      <div>
        {/* <h1 className={codeStyle}>{this.props.roomId}</h1> */}
        <div className="viewer">
          {isConnected ? null : (<div className="instructions">
            <p>Instructions: </p>
            <p>1. Open highlandtv.net on a mobile device. </p>
            <p>2. Enter this code: <span className={codeStyle}>{this.props.roomId}</span></p>
            <p>3. Enjoy the show!</p>
          </div>)}
          
          <img className="television" alt="television" src={television} />

          <div className="iframe" id="player"/>
        </div>
      </div>
    ) 
  }
}

export default Viewer;