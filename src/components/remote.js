import React, {Component} from 'react';
import Socket from '../clients/sockets.js';

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

  joinRoom() {
    Socket.emit('joinRoom', 'aQui'); // TODO replace 'aQui' with user input
    this.setState({
      room: 'aQui',
    });
  }

  playPause() {
    const {room} = this.state;
    const PLAY_PAUSE = ' ';

    Socket.emit('command', room, PLAY_PAUSE);
    console.log('remote: play/pause');
  }

  next() {
    const {room} = this.state;
    const NEXT = 'ArrowRight';

    Socket.emit('command', room, NEXT);
    console.log('remote: next');
  }

  previous() {
    const {room} = this.state;
    const PREVIOUS = 'ArrowLeft';

    Socket.emit('command', room, PREVIOUS);
    console.log('remote: previous');
  }

  mute() {
    const {room} = this.state;
    const MUTE = 'f';

    Socket.emit('command', room, MUTE);
    console.log('remote: mute');
  }

  render() {
    const buttonData = [
      {label: 'join', handler: this.joinRoom}, 
      {label: 'play / pause', handler: this.playPause},
      {label: 'next', handler: this.next},
      {label: 'previous', handler: this.previous},
      {label: 'mute', handler: this.mute},
    ]

    return (
      <div>
      {buttonData.map( 
        (data, ix) => 
          <div key={ix} className="button" id="remote" onClick={data.handler}>
            <h1>{data.label}</h1>
          </div>
         )}
      </div>
    );

  }
}

export default Remote;
