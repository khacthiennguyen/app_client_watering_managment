import { View, Text,StyleSheet,TextInput, Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import { AuthContext } from '../../context/authContext'
import InputBox from '../../components/Form/InputBox'
import SubmitButon from '../../components/Form/SubmitButon'
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    //global state
    const [state,setState] = useContext(AuthContext)

    //state
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[loading,setLoading] = useState(false)

    //funtion
    //btn funtion
    const handleSubmit= async()=>{
        try{
            setLoading(true)
            if(!email || !password){
                Alert.alert('Please fill all fields')
                setLoading(false)
                return 
            }
            setLoading(false)
            const {data} = await axios.post('/auth/login',{email,password})
            setState(data)
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            alert(data && data.message)
            navigation.navigate('Home')
            console.log('Login Data==>', {email,password}) //or {email,password}
            setLoading(false)
        }catch(error){
            alert(error.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }
    //temp funtion to check local storage data
    const getLocalStorageData = async ()=>{
        let data= await AsyncStorage.getItem('@auth')
        console.log("Local Storage==>", data);
    }

    getLocalStorageData()
  return (
    <View style={styles.container}>
      <Text style={styles.pageTile}>Login</Text>  
      <View style={{marginHorizontal:20}}>
      <InputBox inputTitle={'EMAIL'} value={email} setValue={setEmail} 
      autoCapitalize='none'
      keyboardType='email-address'
      autoComplete='email' />
      <InputBox inputTitle={'PASSWORD'} value={password} setValue={setPassword}
      autoComplete='password'
      secureTextEntry={true} />
      </View>
      {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
      <SubmitButon btnTitle='Login'
      loading={loading}
      handleSubmit={handleSubmit}
      />
      <Text style = {styles.linkText}>
       Not a user? Please press {" "}  <Text 
       style={styles.link} 
       onPress={()=> navigation.navigate("Register")}>REGISTER</Text>{""}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#afeeee',
        
    },
    pageTile:{
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        color:'#000000'
    },
    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:'#ffffff',
        borderRadius:10,
        marginTop:10,
        paddingLeft:10,
        color:'#af9f85',
    },
    linkText:{
        textAlign:'center'
    },
    link:{
        color:'#ff0000',
        textDecorationLine:'underline'
    }
})



export default Login