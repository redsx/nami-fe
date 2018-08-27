import socket from '../../connect/socket.js';

export const socketEmit = (event) => (arg) => {
  return new Promise((resolve, reject) => {
    socket.emit(event, arg, (resault)=>{
      if(resault.isError){
        reject(resault.errMsg);
      }
      resolve(resault);
    });
  });
};