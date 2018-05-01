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
        id: {videoId: 'IxtygoMRsR8'},
        snippet: {description: ''},
        contentDetails: {duration: '', caption: ''}
      }
    };

    this.setData = this.setData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleTitleClick(video) {
    this.setState({
      data: [],
      currentData: video
    });
  }

  setData(videos) {
    this.setState({
      data: videos
    });
  }
 
  handleSearch (string) {
    searchYouTube(
      {key: 'AIzaSyCRopAgzj_BQRh7k5XJ9ibW-x0jULl6spU', query: string, maxResults: 25}, this.setData);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className ="nav-bar">
          <h2 className="App-title"> BruTube: Brutalist YouTube </h2>
          <Search className="search-bar" searchHandlerFunction={this.handleSearch}/>
          </div>
          <Viewer video={this.state.currentData}/>
          <Results videos={this.state.data} clickHandlerFunction={this.handleTitleClick}/>
        </div>
      </div>
    );
  }
}

export default App;
