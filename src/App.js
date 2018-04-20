/* jshint esversion: 6 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import searchYouTube from './searchYouTube.js';
import $ from 'jquery';
const AUTOCOMPLETE_URL = 'https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=';
const API_KEY = 'AIzaSyCRopAgzj_BQRh7k5XJ9ibW-x0jULl6spU';

class App extends Component {
  constructor(){
    super();

    this.state = {
      query: "",
      results: []
    };

    this.setData = this.setData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  setData(videos) {
    console.log(videos);
    this.setState({
      data: videos,
      currentData: videos[0]
    });
  }

  handleInputChange(e){
    e.preventDefault()
    this.setState({
      query: e.target.value
    });
  }
 
  handleSearch (event) {
    event.preventDefault();

    this.setState({
      query: this.state.query + event.key
    }, console.log(this.state.query));

    searchYouTube({key: 'AIzaSyCRopAgzj_BQRh7k5XJ9ibW-x0jULl6spU', query: this.state.query, maxResults: 5});
  };

  render() {
    return (
      <div className="App">
          <h1 className="App-title">Television</h1>

        <form onSubmit={this.handleSearch}>
          To get started, edit <code>src/App.js</code> and save to reload.
          <input className="form-control" type="text" onChange={this.handleInputChange}/>
        </form>

      </div>
    );
  }
}

export default App;
