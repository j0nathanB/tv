/* jshint esversion: 6 */
import React, { Component } from 'react';

class Result extends Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.clickHandlerFunction(this.props.video);
  }

  render() {
    return (
      <div>
        <img className="media-object" src={this.props.video.snippet.thumbnails.default.url} alt="" />
        <div className="video-list-entry-title" onClick={this.handleClick} >{this.props.video.snippet.title}</div>
        <div className="video-list-entry-detail">{this.props.video.snippet.description}</div>
      </div>
    )
  }
}

export default Result;