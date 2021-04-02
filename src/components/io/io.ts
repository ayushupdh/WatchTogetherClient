import Constants from "expo-constants";
import { Platform } from 'react-native';
const { manifest } = Constants;
let uriShort= manifest.debuggerHost?.split(':').shift();
let url = (Platform.OS==='web')? `http://localhost:4000`: `http://${uriShort}:4000/sessions`;
import socketIO from "socket.io-client";

export const socketClient =socketIO(url, {      
        transports: ['websocket'], jsonp: false });   
