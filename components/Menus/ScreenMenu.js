import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from '../../screens/Home'
import Register from '../../screens/auth/Register'
import Login from '../../screens/auth/Login'
import { AuthContext } from '../../context/authContext'
import HeaderMenu from './HeaderMenu'
import Sensor from '../../screens/Sensor'
import Analyst from '../../screens/Analyst'
import Account from '../../screens/Account'

const ScreenMenu = () => {
    //global state
    const[state] = useContext(AuthContext)
    // auth condion true false
const authenticatedUser = state?.user && state?.token
    const Stack = createNativeStackNavigator()
    return (
      <Stack.Navigator initialRouteName='Login'>
        {authenticatedUser ? (
        <>
           <Stack.Screen name="Home" component={Home} options={{
            headerShown:true,
            title:'Watering Managment App',
            headerRight:()=><HeaderMenu/>
        }}/>
        <Stack.Screen name="Sensor" component={Sensor} options={{
            headerBackTitle:'Back',
            headerRight:()=><HeaderMenu/>
        }}/>
                <Stack.Screen name="Analyst" component={Analyst} options={{
            headerBackTitle:'Back',
            headerRight:()=><HeaderMenu/>
        }}/>
                <Stack.Screen name="Account" component={Account} options={{
            headerBackTitle:'Back',
            headerRight:()=><HeaderMenu/>
        }}/>
        
        </>) : (
            <>
            <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            </>
        )}
     </Stack.Navigator>
    );
}

export default ScreenMenu