import axios from 'axios'
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { manifest } = Constants;
let uriShort= manifest.debuggerHost?.split(':').shift();
let url = `http://${uriShort}:4000`;

// const url= 'http://localhost:4000'
type loginData={
    email:string;
    password:string;
}
const server = axios.create({
  baseURL: url,
});
export const signinUser = async(data:loginData)=>{

    try{
      const res = await server.post("/users/login", data);

      const userToken = res.data.token;
      // await AsyncStorage.setItem('userToken', userToken);
      console.log(res.data.user.name);
      return res.data.user.name;
    }catch(e){
      return null;
    }
}

export const getUser = async()=>{

  try{
    // await AsyncStorage.removeItem('userToken');
    const token = await AsyncStorage.getItem('userToken');
    let options = {
      headers: {
        'Authorization': 'Bearer ' +   token    }
    }
    const res = await server.get("/users/me", options);
    // await AsyncStorage.setItem('name', res.data.name);
    console.log(res.data.name);
    return res.data.name
  }catch(e){
    return null;
  }
}

export const logoutUser = async()=>{
  try{
    // await AsyncStorage.removeItem('userToken');
    const token = await AsyncStorage.getItem('userToken');

    let options = {
      headers: {
        'Authorization': 'Bearer ' +   token    }
    }
    const res = await server.post("/users/logout",{}, options);
    await AsyncStorage.setItem('name', '');
    await AsyncStorage.setItem('userToken', '');
    // console.log(res.data.name);
    return "OK"
  }catch(e){
    return null;
  }
}