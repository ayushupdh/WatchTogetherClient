import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { SIGN_IN } from "../../redux/types/Authtypes";

import {AuthStyles as Styles} from '../styles';
import {CustomButton} from '../dumbComponents/CustomButton'
import LoginHeaderImage from '../../../assets/svgs/Login.svg'
import { AuthNavProps } from './AuthTypes';
import {LoginDataType} from './AuthTypes'
import { AuthContext } from './AuthProvider';

import {useDispatch, useSelector} from 'react-redux';
import { server } from '../../api/server';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signin = ({navigation}:AuthNavProps<'Signin'>) => {
	const [userData, setUserData] = useState<LoginDataType>({
		email:'',
		password:''
	})
	const [ error, setError] = useState('');
	const dispatch = useDispatch();

	const login =async()=>{
		try {
			const res = await server.post('/users/login', userData);
			const userToken = res.data.token;
			await AsyncStorage.setItem('userToken', userToken);
            dispatch({
                        type:SIGN_IN,
                        payload:{
                                user:{
                                        username: res.data.user.name
                                    }
                                } 
                    })

		} catch (e) {
			setError("Invalid username or password")
		}
	}
	// const {signin} =useContext(AuthContext);
	const onSigninPress = async() => {
		if(userData.email===''|| userData.password===""){
			setError('Missing username or password')
			return;
		}
		login();


	};
	const passwordRef: any = useRef();

	return (
		<View>
			<Text style={Styles.title}> Watch Together</Text>

			<View style={Styles.textInputView}>
				<TextInput
					style={Styles.inputBox}
					placeholder="Email"
					onChangeText={(text) => {
						setUserData({...userData, email:text})
						setError('')
					}}
					value={userData.email}
					returnKeyType="next"
                    onSubmitEditing={()=>passwordRef.current?.focus()}
                    textContentType='username'
				/>
				<TextInput
					ref={passwordRef}
					placeholder="Password"
					style={Styles.inputBox}
					onChangeText={(text) => {
						setUserData({...userData, password:text})
						setError('')}}
					value={userData.password}
                    returnKeyType="done"
                    textContentType='password'
                    secureTextEntry
				/>
			</View>
			{error===''? null :<Text style={Styles.errorText}>{error}</Text>}
			<View >
				<CustomButton onPressHandler={onSigninPress} text={"Login"} style={Styles.button}/>
			</View>
			<View style={Styles.altTextContainer}>
				<Text style={Styles.altText}>I am a new user!</Text>
				<Text onPress={()=>{
					navigation.navigate('Signup')
					setUserData(
							{email:'',
							password:''})
					setError('')
				}} style={Styles.altTextBlue}>Sign me up</Text>
			</View>

		</View>
	);
};

export default Signin;
