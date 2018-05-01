/* jshint esversion: 6 */
import React, { Component } from 'react';
import Result from './result.jsx';

class Results extends Component { 

  render() {
    const searchResults = this.props.videos.map( (item, key) => <Result 
    video={item}
    clickHandlerFunction={this.props.clickHandlerFunction} />);

    return (
      <div className="results">
        {searchResults}
      </div>
    )
  }
}

export default Results;