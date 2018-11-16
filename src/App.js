/* jshint esversion: 6 */
import React, { Component } from 'react';
import './App.css';
import Viewer from './components/viewer.js';
import television from './assets/tv.png'

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

    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleInput, false);
  }

  handleInput(e) {
    switch (e.key) {
      case 'j':
        console.log('next');
        this.player.nextVideo();
        break;
      case 'f':
        console.log('previous');
        this.player.previousVideo();
        break;
      case 'g':
        console.log('play/pause');
        break;
      default:
        console.log('x')
    }
  }

  init() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log(`paused @ ${this.cleanTime()}`);
        };
        break;
      case window['YT'].PlayerState.ENDED:
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
          <img className="television" alt="television" src={television} />
          <Viewer />
        </div>
      </div>
    );
  }
}

export default App;
