import axios from 'axios'
import Constants from "expo-constants";
import { Platform } from 'react-native';
const { manifest } = Constants;
let uriShort= manifest.debuggerHost?.split(':').shift();
let url = (Platform.OS==='web')? `http://localhost:4000`: `http://${uriShort}:4000`;

// const url= 'http://localhost:4000'
export const server = axios.create({
  baseURL: url,
});
