/* jshint esversion: 6 */
import React, { Component } from 'react';
import './App.css';
import Viewer from './components/viewer.js';
import Remote from './components/remote.js'

class App extends Component {
  constructor(){
    super();
    this.init();

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.player = new window['YT'].Player('player', {
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          //'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            e.target.playVideo();
          }
        },
        playerVars: 
          {
            listType:'playlist',
            list: 'PLAEQD0ULngi67rwmhrkNjMZKvyCReqDV4'
          },
        width: 475
      });
    };

    this.state = {
      isPlaying: true,
      isClientMobile: false
    };

    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    const isMobile = 
    navigator.userAgent.indexOf( "Mobile" ) !== -1 || 
    navigator.userAgent.indexOf( "iPhone" ) !== -1 || 
    navigator.userAgent.indexOf( "Android" ) !== -1 || 
    navigator.userAgent.indexOf( "Windows Phone" ) !== -1 ;

  this.setState({
    isClientMobile: isMobile
  });
    document.addEventListener("keydown", this.handleInput, false);
  }

  handleInput(e) {
    const {isPlaying} = this.state;

    switch (e.key) {
      case 'j':
        this.player.nextVideo();
        console.log('next');
        break;
      case 'f':
        this.player.previousVideo();
        console.log('previous');
        break;
      case ' ':
        isPlaying ? this.player.pauseVideo() : this.player.playVideo();
        console.log('play/pause');
        break;   
      default:
        console.log('Press J, F, or Space.');
    }
  }

  init() {
    // inserts script into DOM to have access to YouTube iFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        const status = this.cleanTime === 0 ? 'started' : 'playing';
        this.setState({ isPlaying: true });
        console.log(`${status}: ${this.cleanTime()}`);

        break;
      case window['YT'].PlayerState.PAUSED:
        this.setState({ isPlaying: false });
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log(`paused @ ${this.cleanTime()}`);
        };

        break;
      case window['YT'].PlayerState.ENDED:
        this.setState({ isPlaying: false });
        console.log('ended ');
        
        break;
      default: break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };


  render() {
    return (
      <div className="App">
        <div className="container">
          {this.state.isClientMobile ? 
            <Remote isPlaying={this.state.isPlaying} handleClick={this.handleInput}/> : 
            <Viewer />
            }
        </div>
      </div>
    );
  }
}

export default App;
