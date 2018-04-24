/* jshint esversion: 6 */
import React, { Component } from 'react';
import Result from './result.jsx';

class Results extends Component { 

  render() {
    return this.props.videos.map( 
      item => <Result 
        video={item}
        clickHandlerFunction={this.props.clickHandlerFunction} 
      /> 
    )
  }
}

export default Results;