import React, {Component} from 'react';
import Socket from '../clients/sockets.js';
import RoomForm from './roomForm'
import './remote.css';

class Remote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: '',
      isConnected: false,
      isPlaying: false,
      thing: 'meep'
    };

    this.playPause = this.playPause.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.mute = this.mute.bind(this);
  }

  componentDidMount() {
    const {room} = this.state;

    Socket.on('verify', (code) => {
      console.log('code', code, 'room', room)
      //this.setState({ isConnected: code === room })
    })
  }

  joinRoom(code) {
    this.setState({ room: code }, console.log(code, this.state.room));
    Socket.emit('joinRoom', code);
  }

  playPause() {
    const { room, isPlaying } = this.state;
    const PLAY_PAUSE = ' ';

    Socket.emit('sendCommand', room, PLAY_PAUSE);
    this.setState({ isPlaying: !isPlaying });

    console.log('remote: play/pause');
  }

  next() {
    const {room} = this.state;
    const NEXT = 'ArrowRight';

    Socket.emit('sendCommand', room, NEXT);
    this.setState({ isPlaying: true });

    console.log('remote: next');
  }

  previous() {
    const {room} = this.state;
    const PREVIOUS = 'ArrowLeft';

    Socket.emit('sendCommand', room, PREVIOUS);
    this.setState({ isPlaying: true });

    console.log('remote: previous');
  }

  mute() {
    const { room, isMuted } = this.state;
    const MUTE = 'f';

    Socket.emit('sendCommand', room, MUTE);
    this.setState({ isMuted: !isMuted });

    console.log('remote: mute');
  }

  render() {
    const { isConnected, isMuted, isPlaying } = this.state;
    const playPause = isConnected & isPlaying ? 'pause' : 'play_arrow';
    const mute = isConnected & isMuted ? 'volume_up' : 'volume_off'

    const buttonData = [
      {label: playPause, handler: this.playPause},
      {label: 'skip_previous', handler: this.previous},
      {label: 'skip_next', handler: this.next},
      {label: mute, handler: this.mute},
    ]

    return (
      <div className="remote">
        <div className="remote-inner">
          <RoomForm handleCodeSubmit={this.joinRoom} />
          {/* {isConnected 
            ? <div className="led-green" /> 
            : <div className="led-red" />}  */}
          <div className="controls">
            {buttonData.map( 
              (data, ix) => 
                <div key={ix} 
                  className={`button button${ix}`} 
                  onClick={data.handler}>
                  
                  <i className="material-icons" 
                    style={{fontSize: 48}}>{data.label}</i>
                </div>
            )}
          </div>
        
          <h1 className="logo">Space Command</h1>
        </div>
      </div>
    );

  }
}

export default Remote;
