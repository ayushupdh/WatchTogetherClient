import { Pressable, Text, ViewStyle } from 'react-native';
import React from 'react';

type CustomButtonProps = {
	text: string;
	onPressHandler?: () => void;
	style?: ViewStyle;
};
export const CustomButton = (props: CustomButtonProps) => {
	return (
		<Pressable onPress={props.onPressHandler} style={props.style}>
			<Text style={{ alignSelf: 'center', fontSize: 20, color: '#fff' }}>{props.text}</Text>
		</Pressable>
	);
};
