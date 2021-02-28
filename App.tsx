import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Platform } from 'react-native';

import AuthNavigator from './src/components/Auth/AuthNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const Container = Platform.OS == 'ios' ? SafeAreaView : View;

export default function App() {
	// return <HomeScreen name={user.username} />;

	return (
		<Provider store={store}>
			<AuthNavigator />
			{/* <Home /> */}
		</Provider>
	);
}
