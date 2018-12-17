import React, { Component } from 'react';
import television from '../assets/tv_small.png'
import tvStatic from '../assets/tv_static.gif'

class Viewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }

    this.showStatic = this.showStatic.bind(this)
    this.timer = setTimeout(this.showStatic, 750)
  }

  showStatic() {
    this.setState({ isLoading: false });
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

  render() {
    const { isConnected, isLoading } = this.props;
    // const codeStyle = isConnected ? "room-code room-code-active" : "room-code" 

    return (
      <div>
        {this.state.isLoading ? <img className="tvStatic" src={tvStatic} /> : null}
        <div className="viewer">
          <img className="television" alt="television" src={television} />

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