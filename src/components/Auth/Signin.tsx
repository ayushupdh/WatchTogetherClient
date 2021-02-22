import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import React, { createRef, useRef, useState } from 'react';

import {AuthStyles as Styles} from '../styles';
import {signinUser} from '../../api/server'
import {CustomButton} from '../dumbComponents/CustomButton'
import LoginHeaderImage from '../../../assets/svgs/Login.svg'
type UserData={
	email:string;
	password:string;
}

const Signin = ({navigation}:any) => {
	const [userData, setUserData] = useState<UserData>({
		email:'',
		password:''
	})
	const [ error, setError] = useState('');
	const onSigninPress = async() => {
		if(userData.email===''|| userData.password===""){
			setError('Missing username or password')
		}
		let signedIn = await signinUser(userData);
		console.log(signedIn);
		if(signedIn===null){
			setError('Invalid email or password');
		}else{
			setError('Signed In: '+ signedIn);
		}


	};
	const passwordRef: any = useRef();

	return (
		<View>
			<Text style={Styles.title}> Watch Together</Text>

			<View style={Styles.textInputView}>
				<TextInput
					style={Styles.inputBox}
					placeholder="Email"
					onChangeText={(text) => setUserData({...userData, email:text})}
					value={userData.email}
					returnKeyType="next"
                    onSubmitEditing={()=>passwordRef.current?.focus()}
                    textContentType='username'
				/>
				<TextInput
					ref={passwordRef}
					placeholder="Password"
					style={Styles.inputBox}
					onChangeText={(text) => setUserData({...userData, password:text})}
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
				<Text onPress={()=>{navigation.navigate('Signup')}} style={Styles.altTextBlue}>Sign me up</Text>
			</View>

		</View>
	);
};

export default Signin;
