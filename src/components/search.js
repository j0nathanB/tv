import React, { Component } from 'react';

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchTerm: ""
    };
  }

  onInputChange = (searchTerm) => {
      this.setState({
      searchTerm: searchTerm
    });

    //this.props.onSearchTermChange(searchTerm);
  }

  render() {
    return (
      <div className="search">
        <input 
          value={this.state.term} 
          onChange={e => this.onInputChange(e.target.value)}
        />
      </div>
    )
  }
}

export default Search;