import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Platform } from 'react-native';
import { getUser } from './src/api/server';
import AuthNavigator from './src/components/Auth/AuthNavigator';
import Login from './src/components/Auth/Signin';

const Container = Platform.OS == 'ios' ? SafeAreaView : View;

export default function App() {
	return <AuthNavigator />;
}

// export default function App() {
// 	const [ user, setUser ] = useState('');
// 	const handleLogin = async () => {
// 		let name = await getUser();
// 		if (name !== null) {
// 			setUser(name);
// 		}
// 	};
// 	const handleLogout = async () => {
// 		setUser('');
// 	};
// 	useEffect(() => {
// 		let name: string | null;
// 		(async () => {
// 			name = await getUser();
// 			if (name !== null) {
// 				setUser(name);
// 			}
// 		})();
// 	}, []);

// 	return (
// 		<Container>
// 			{user === '' ? (
// 				<Login userLoggedIn={handleLogin} />
// 			) : (
// 				<HomeScreen name={user} userLoggedout={handleLogout} />
// 			)}
// 		</Container>
// 	);
// }

// // const styles = StyleSheet.create({
// // 	container: {
// // 		flex:
// // 	}
// // });
