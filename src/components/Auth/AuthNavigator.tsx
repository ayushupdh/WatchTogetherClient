import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import Signin from './Signin';
import Signup from './Signup';
import { AuthParamList } from './AuthParamList';

type AuthNavigatorProps = {};

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigator = (props: AuthNavigatorProps) => {
	const [ user, setUser ] = useState('');

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Signin"
				screenOptions={{
					headerShown: false
				}}
			>
				<Stack.Screen name="Signin" component={Signin} />
				<Stack.Screen name="Signup" component={Signup} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AuthNavigator;
