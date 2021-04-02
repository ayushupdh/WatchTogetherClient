import {socketClient as socket} from './io'
export const emitter = {
    startSession:()=>{
        console.log('Sent');
        socket.emit("start-session");
    },
    endSession:()=>{
        console.log('Sent');
        socket.emit("end-session");
    },
}