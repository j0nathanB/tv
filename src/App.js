import React, { Component } from 'react';
import './App.css';
import Viewer from './components/viewer.js';
import Remote from './components/remote.js';
import Socket from './clients/sockets.js';

class App extends Component {
  constructor(){
    super();
    this.init();
    
    this.state = {
      isConnected: false,
      isPlaying: false,
      isMobile: false,
      isMuted: false,
      roomId: 4
    };

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.player = new window['YT'].Player('player', {
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          //'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            // e.target.playVideo();
            // this.setState({isPlaying: true})
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

    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
    this.handleClickerInput = this.handleClickerInput.bind(this);
    this.playerCommands = this.playerCommands.bind(this);
  }

  componentWillMount() {
    const isMobile = 
      navigator.userAgent.indexOf( "Mobile" ) !== -1 || 
      navigator.userAgent.indexOf( "iPhone" ) !== -1 || 
      navigator.userAgent.indexOf( "Android" ) !== -1 || 
      navigator.userAgent.indexOf( "Windows Phone" ) !== -1 ;

    this.setState({
      isMobile: isMobile,
      isPlaying: false
    });

    document.addEventListener("keydown", this.handleKeyboardInput, false);
  }

  componentDidMount() {
    const { isMobile } = this.state;

    if (!isMobile) {
      Socket
      .emit('init')
      .on('handshake', 
        (roomId) => {
          this.setState({ 
            roomId: roomId, 
          });
        });
    }

    const removeCode = () => {
      setTimeout( () => {
        this.setState({ roomId: ""});
      }, 3000)
    }

    Socket.on('connected', (bool) => 
      this.setState({ isConnected: bool }, removeCode()));
    Socket.on('sendCommand', (cmd) => this.handleClickerInput(cmd));
  }

  init() {
    // inserts script into DOM to have access to YouTube iFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  handleClickerInput(cmd) {
    this.playerCommands(cmd);
  }    

  handleKeyboardInput(e) {
    this.playerCommands(e.key);
  }

  playerCommands(input) {
    const { isPlaying, isMobile, isMuted } = this.state;
    const { player } = this;

    // Prevent mobile component from executing input
    if (!isMobile) {
      switch (input) {
        //Next video
        case 'ArrowRight':
          player.nextVideo();
          break;
  
        //Previous video
        case 'ArrowLeft':
          player.previousVideo();
          break;
  
        //Play/mute
        case ' ':
          isPlaying ? player.pauseVideo() : player.playVideo();
          this.setState({ isPlaying: !isPlaying });
          break; 
  
        //Mute
        case 'f':
          isMuted ? player.unMute() : player.mute();
          this.setState({ isMuted: !isMuted });
          
          break;
          default:
      }    
    }
    
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
    const { isConnected, isMobile, isMuted, isPlaying, roomId } = this.state;
    const deviceClass = isMobile ? "App mobile" : "App desktop"

    return (
      <div className={deviceClass} onKeyPress={this.handleKeyboardInput}>
          { isMobile 
              ? <Remote isPlaying={isPlaying} isMuted={isMuted}
                  handleInput={this.handleKeyboardInput}/> 
              : <Viewer roomId={roomId} isConnected={isConnected}/>
            }
      </div>
    );
  }
}

export default App;
