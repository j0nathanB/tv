/* jshint esversion: 6 */
import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      query: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleInputChange(e){
    e.preventDefault();

    this.setState({
      query: e.target.value
    });
  }

  handleSearch (e) {
    e.preventDefault();

		this.props.searchHandlerFunction(this.state.query);
  }

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <input
          className="search-bar"
          placeholder="Search YouTube"
          value={this.state.query} 
          onChange={e => this.handleInputChange(e)
        }/>
      </form>
	  );
  }

}

export default Search;