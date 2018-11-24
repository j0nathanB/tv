/* jshint esversion: 6 */
import io from 'socket.io-client';

const server = process.env.NODE_ENV === 'development' ? 
  'http://localhost:3001' : 
  '/';

const Socket = io(server);
export default Socket;