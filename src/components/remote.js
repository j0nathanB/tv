import React, {Component} from 'react';
import Socket from '../clients/sockets.js';
import RoomForm from './roomForm'
import './remote.css';

class Remote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: '42',
    };

    this.playPause = this.playPause.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.mute = this.mute.bind(this);
  }

  joinRoom(code) {
    Socket.emit('joinRoom', code); // TODO replace 'aQui' with user input
    this.setState({ room: code });
  }

  playPause() {
    const {room} = this.state;
    const PLAY_PAUSE = ' ';

    Socket.emit('sendCommand', room, PLAY_PAUSE);
    console.log('remote: play/pause');
  }

  next() {
    const {room} = this.state;
    const NEXT = 'ArrowRight';

    Socket.emit('sendCommand', room, NEXT);
    console.log('remote: next');
  }

  previous() {
    const {room} = this.state;
    const PREVIOUS = 'ArrowLeft';

    Socket.emit('sendCommand', room, PREVIOUS);
    console.log('remote: previous');
  }

  mute() {
    const {room} = this.state;
    const MUTE = 'f';

    Socket.emit('sendCommand', room, MUTE);
    console.log('remote: mute');
  }

  render() {
    const {isMuted, isPlaying} = this.props;
    const playPause = isPlaying ? 'pause' : 'play_arrow';
    const mute = isMuted ? 'volume_up' : 'volume_off'

    const buttonData = [
      {label: playPause, handler: this.playPause},
      {label: 'skip_previous', handler: this.previous},
      {label: 'skip_next', handler: this.next},
      {label: mute, handler: this.mute},
    ]

    return (
      <div className="remote">
        <RoomForm handleCodeSubmit={this.joinRoom} />
        <div className="controls">
          {buttonData.map( 
            (data, ix) => 
              <div key={ix} className={`button button${ix}`} onClick={data.handler}>
                <i className="material-icons" style={{fontSize: 48}}>{data.label}</i>
              </div>
            )}
          </div>
      </div>
    );

  }
}

export default Remote;
