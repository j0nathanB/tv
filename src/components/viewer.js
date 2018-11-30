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
        <h1 className={codeStyle}>{this.props.roomId}</h1>
        <div className="viewer">
          <img className="television" alt="television" src={television} />
          {tvImage}
          <div className="iframe" id="player"/>
        </div>
      </div>
    ) 
  }
}

export default Viewer;