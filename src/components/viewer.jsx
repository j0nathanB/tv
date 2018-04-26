/* jshint esversion: 6 */
import React, { Component } from 'react';

class Viewer extends Component {
  render() {
    console.log('>>>>>>>>>> this.props.video:', Object.keys(this.props.video));
    return (
      
        <div>
        { Object.keys(this.props.video).length > 1 ? 
          <div><iframe className="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.props.video.id.videoId} allowFullScreen></iframe> 
          <h3>{this.props.video.snippet.title}</h3></div> :
          null
        }

        </div>
      
    ) 

  }
}

export default Viewer;