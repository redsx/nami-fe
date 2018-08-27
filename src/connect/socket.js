import io from 'socket.io-client';
import config from '../config/socket';

if(process.env.NODE_ENV === 'development'){
  module.exports = io('//'+config.development.HOST+':'+config.development.PORT, {'force new connection': true});
} else{
  module.exports = io('', {'force new connection': true});
}