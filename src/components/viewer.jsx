/* jshint esversion: 6 */
import React, { Component } from 'react';

class Viewer extends Component {
  render() {
    return (
      
        <div>
          <div><iframe className="viewer" width="640" height="385" src={'https://www.youtube.com/embed/' + this.props.video.id.videoId} allowFullScreen></iframe> 
          <h3>{this.props.video.snippet.title}</h3></div> 
        </div>
      
    ) 

  }
}

export default Viewer;