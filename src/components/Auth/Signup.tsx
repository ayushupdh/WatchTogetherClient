import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import React, { createRef, useRef, useState } from 'react';

import {AuthStyles as Styles} from '../styles';
import { CustomButton } from '../dumbComponents/CustomButton';
// import {signinUser} from '../../api/server'

type UserData={
	name:string;
	email:string;
	password:string;
	username:string;
}


const Signup = ({navigation}:any) => {
	const [userData, setUserData] = useState<UserData>({
		username:'',
		password:'',
		email:'',
		name:''
	})
	const [ error, setError] = useState('');
	const passwordRef: any = useRef();

	const onSignUp = ()=>{
		if(userData.username==='' || userData.password==="" || userData.email==="" || userData.name===""  ){
			setError("All the fields are required for signing up!");
		}
	}

	return (
		<View>
			<Text style={Styles.title}> Watch Together</Text>
			<View style={Styles.textInputView}>
			<TextInput
					style={Styles.inputBox}
					placeholder="Name"
					onChangeText={(text) => setUserData({...userData, name:text})}
					value={userData.name}
					returnKeyType="next"
                    onSubmitEditing={()=>passwordRef.current?.focus()}
                    textContentType='username'
				/>
				<TextInput
					style={Styles.inputBox}
					placeholder="Username"
					onChangeText={(text) => setUserData({...userData, username:text})}
					value={userData.username}
					returnKeyType="next"
                    onSubmitEditing={()=>passwordRef.current?.focus()}
                    textContentType='username'
				/>
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
				<CustomButton onPressHandler={onSignUp} text={"Signup"} style={Styles.button}/>
			</View>
			<View style={Styles.altTextContainer}>
				<Text style={Styles.altText}>I have an account!</Text>
				<Text onPress={()=>{navigation.navigate('Signin')}} style={Styles.altTextBlue}>Sign In</Text>
			</View>
			

		</View>
	);
};

export default Signup;
