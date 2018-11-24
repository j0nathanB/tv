import React, { Component } from 'react'
import '../App.css';

export class Buttons extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isPlaying: true,
      isMuted: false
    }
  }

  remoteButton({ label="", handler=""}) {
    return <button onClick={handler}><h1>{label}</h1></button>
  }  

  render() {
    const { buttonData } = this.props;

    return (
      buttonData.map( data => this.remoteButton( data ))
    )
  }
}

export default Buttons
