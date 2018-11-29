import React, { Component } from 'react'

export default class roomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const {handleCodeSubmit} = this.props;
    handleCodeSubmit(this.state.value);
    this.setState({value: ''});
    event.preventDefault();

  }

  render() {
    return (
        <div>
      <form onSubmit={this.handleSubmit}>
          <input 
            className="form" 
            type="text" 
            value={this.state.value} 
            onChange={this.handleChange} 
            placeholder="Enter room id here"  
          />
        
        <button className="form-button" type="submit" >Join</button>
      </form>
        </div>
    );
  }
}