/* jshint esversion: 6 */
import io from 'socket.io-client';

const server = process.env.NODE_ENV === 'development' 
  ? process.env.REACT_APP_LOCALHOST
  : process.env.REACT_APP_EC2

const Socket = io(server);
export default Socket;