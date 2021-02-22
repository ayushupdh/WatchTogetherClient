import React from 'react';
import { View, Text, Button } from 'react-native';
import { logoutUser } from '../api/server';
import Styles from './styles';
export default function HomeScreen({ name, userLoggedout }: any) {
	const onLogoutPress = async () => {
		let status: string | null = await logoutUser();
		if (status === 'OK') {
			userLoggedout();
		} else {
			console.log('Error');
		}
	};
	return (
		<View>
			<Text style={Styles.text}> Hi {name}! You will be able to swipe in a minute! </Text>
			<View style={{ position: 'absolute', top: 370, alignSelf: 'center' }}>
				<Button onPress={onLogoutPress} title="Logout" color="#121" accessibilityLabel="Logout Button" />
			</View>
		</View>
	);
}
