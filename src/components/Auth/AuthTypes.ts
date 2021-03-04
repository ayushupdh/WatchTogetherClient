import { StackNavigationProp } from "@react-navigation/stack"


export type AuthParamList= {
    Signin: undefined;
    Signup:undefined;
}
export type LoginDataType={
    username:string;
    password:string;
}
export type SignUpDataType={
    email:string;
    password:string;
    name:string;
    username:string;
}

export type AuthNavProps<T extends keyof AuthParamList> = {
    navigation:StackNavigationProp<AuthParamList, T >;
}