import React from 'react';
import { View } from 'react-native';

export const Center = ({ children }: any) => {
	return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{children}</View>;
};
