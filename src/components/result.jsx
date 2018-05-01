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
  //        <h4>{this.props.video.contentDetails.duration} Captions available: {this.props.video.contentDetails.caption ? 'Yes' : 'No'}</h4>
  render() {
    return (
      <div className="search-result">
        <img src={this.props.video.snippet.thumbnails.default.url} alt="" />
        <a className="description" onClick={this.handleClick}>{this.props.video.snippet.title}</a>
      </div>
    )
  }
}

export default Result;