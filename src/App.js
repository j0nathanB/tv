/* jshint esversion: 6 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import searchYouTube from './searchYouTube.js';
import Search from './components/search.jsx';
import Viewer from './components/viewer.jsx';
import Results from './components/results.jsx';

import $ from 'jquery';
const AUTOCOMPLETE_URL = 'https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=';
const API_KEY = 'AIzaSyCRopAgzj_BQRh7k5XJ9ibW-x0jULl6spU';

class App extends Component {
  constructor(){
    super();

    this.state = {
      data: [],
      query: "",
      results: [],
      currentData: { 
        id: 'dQw4w9WgXcQ',
        snippet: 'Rick Roll'
      }
    };

    this.setData = this.setData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleTitleClick(video) {
    this.setState({
      currentData: video
    });
  }

  setData(videos) {
    console.log(videos);
    this.setState({
      data: videos,
      currentData: videos[0]
    });
  }
 
  handleSearch (string) {
    searchYouTube(
      {key: 'AIzaSyCRopAgzj_BQRh7k5XJ9ibW-x0jULl6spU', query: string, maxResults: 5}, this.setData);
  };

  render() {
    return (
      <div className="App">
          <h1 className="App-title">Television</h1>
        <div>
          <Search searchHandlerFunction={this.handleSearch}/>
          <Viewer video={this.state.currentData}/>
          <Results videos={this.state.data} clickHandlerFunction={this.handleTitleClick}/>
        </div>
      </div>
    );
  }
}

export default App;
