import {Socket,} from "socket.io-client"
export const initListeners= (socket:Socket
    )=>{
socket.on("User Connected", ()=>{
    console.log('Connected');
})


}