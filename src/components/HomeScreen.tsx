import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { SIGN_OUT } from '../redux/types/Authtypes';
import { AuthContext } from './Auth/AuthProvider';
import { Center } from './dumbComponents/Center';
// import { logoutUser } from '../api/server';
import { AuthStyles as Styles } from './styles';
export default function HomeScreen({ user }: any) {
	const dispatch = useDispatch();
	const onLogoutPress = async () => {
		await AsyncStorage.removeItem('userToken');
		dispatch({
			type: SIGN_OUT
		});
	};
	return (
		<Center>
			<Text style={Styles.tempText}>
				Hi {user === '' ? 'User' : user.username}! You will be able to swipe in a minute!{' '}
			</Text>
			<View style={{ marginTop: 200 }}>
				<Button onPress={onLogoutPress} title="Logout" color="#121" accessibilityLabel="Logout Button" />
			</View>
		</Center>
	);
}
