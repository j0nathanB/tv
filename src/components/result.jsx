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
        <a onClick={this.handleClick} >{this.props.video.snippet.title}</a>
      </div>
    )
  }
}

export default Result;