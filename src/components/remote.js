/* jshint esversion: 6 */
import React, { Component } from 'react';

class Remote extends Component {
  constructor(props) {
    super(props)
    
    this.playPause = this.playPause.bind(this)
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