import React, { Component } from 'react'

export default class roomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      room: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  handleFocus(event) {
    this.setState({value: ''});
  }

  handleBlur(event) {
    if (this.state.value === ''){
      this.setState({value: "ENTER ROOM ID"});
    }
  }

  handleSubmit(event) {
    const {handleCodeSubmit} = this.props;
    handleCodeSubmit(this.state.value);
    this.setState({value: ''});
    event.preventDefault();
  }

  render() {
    return (
      <div className="room-form">
        <form onSubmit={this.handleSubmit}>
            <input 
              className="form" 
              type="text" 
              value={this.state.value} 
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              placeholder="ENTER CODE"
            />
          <button className="form-button" type="submit" >➔</button>
        </form>
      </div>
    );
  }
}