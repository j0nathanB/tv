/* jshint esversion: 6 */
import React, { Component } from 'react';

class Viewer extends Component {
  render() {
    return (
          this.props.video ? 
            <div>
              <iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.props.video.id.videoId} allowFullScreen></iframe> 
              <h3>{this.props.video.snippet.title}</h3>
              <div>{this.props.video.snippet.description}</div> 
            </div> :
            <h1>asdasd</h1>
        
    ) 

  }
}

export default Viewer;