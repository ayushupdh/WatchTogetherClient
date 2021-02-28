import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import { server } from '../../api/server';
import { LoginDataType } from './AuthTypes';

// type User = null | { username: string };

// export const AuthContext = React.createContext<{
// 	user: User;
// 	login: () => void;
// 	logout: () => void;
// }>({
// 	user: null,
// 	login: () => {},
// 	logout: () => {}
// });

// interface AuthProviderProps {
// 	children?: any;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
// 	const [ user, setUser ] = useState<User>(null);
// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				user,
// 				login: () => {
// 					const fakeUser = { username: 'bob' };
// 					setUser(fakeUser);
// 					AsyncStorage.setItem('user', JSON.stringify(fakeUser));
// 				},
// 				logout: () => {
// 					setUser(null);
// 					AsyncStorage.removeItem('user');
// 				}
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };
type User = { username: string };

type ContextProp = {
	user: User;
	signin: ({ email, password }: LoginDataType) => any;
	signup: () => void;
	signout: () => void;
};

export const AuthContext = createContext<ContextProp>({
	user: { username: '' },
	signin: () => {},
	signup: () => {},
	signout: () => {}
});

export const AuthProvider = (props: any) => {
	const [ user, setUser ] = useState<User>({ username: '' });
	const signinUser = async (data: LoginDataType) => {
		try {
			const res = await server.post('/users/login', data);

			const userToken = res.data.token;
			// await AsyncStorage.setItem('userToken', userToken);
			setUser({ username: res.data.user.name });
			console.log('prov', user.username);
		} catch (e) {
			return null;
		}
	};

	const getUser = async () => {
		try {
			// await AsyncStorage.removeItem('userToken');
			const token = await AsyncStorage.getItem('userToken');
			let options = {
				headers: {
					Authorization: 'Bearer ' + token
				}
			};
			const res = await server.get('/users/me', options);
			// await AsyncStorage.setItem('name', res.data.name);
			console.log(res.data.name);
			return res.data.name;
		} catch (e) {
			return null;
		}
	};

	const logoutUser = async () => {
		try {
			// await AsyncStorage.removeItem('userToken');
			const token = await AsyncStorage.getItem('userToken');

			let options = {
				headers: {
					Authorization: 'Bearer ' + token
				}
			};
			const res = await server.post('/users/logout', {}, options);
			await AsyncStorage.setItem('name', '');
			await AsyncStorage.setItem('userToken', '');
			// console.log(res.data.name);
			return 'OK';
		} catch (e) {
			return null;
		}
	};
	return (
		<AuthContext.Provider value={{ user, signin: signinUser, signout: logoutUser, signup: () => {} }}>
			{props.children}
		</AuthContext.Provider>
	);
};
