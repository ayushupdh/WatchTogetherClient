import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from './api/server';
import AuthNavigator from './components/Auth/AuthNavigator';
import HomeScreen from './components/HomeScreen';
import { LOAD_USER } from './redux/types/Authtypes';
export const Home = () => {
	const user = useSelector((user) => user);
	console.log(user);
	if (user === null) {
		console.log('no');
		return <HomeScreen name={user} />;
	} else {
		return <AuthNavigator />;
	}
};
