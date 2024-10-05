import { View, Text,StyleSheet,TextInput, Alert } from 'react-native'
import React,{useState} from 'react'
import InputBox from '../../components/Form/InputBox'
import SubmitButon from '../../components/Form/SubmitButon'
import axios from "axios"
const Register = ({navigation}) => {

    //state
    const [name,setName]=useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[loading,setLoading] = useState(false)

    //funtion
    //btn funtion
    const handleSubmit= async ()=>{
        try{
            setLoading(true)
            if(!name || !email || !password){
                Alert.alert('Please fill all fields')
                setLoading(false)
                return 
            }
            setLoading(false)
            const {data} = await axios.post('/auth/register',
            {name,email,password})
            alert(data && data.message)
            navigation.navigate('Login')
            console.log('Register Data==>',{name,email,password})
        }catch(error){
            alert(error.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTile}>Register</Text>  
      <View style={{marginHorizontal:20}}>
      <InputBox inputTitle={'NAME'} value={name} setValue={setName}/>
      <InputBox inputTitle={'EMAIL'} value={email} setValue={setEmail} 
      autoCapitalize='none'
      keyboardType='email-address'
      autoComplete='email' />
      <InputBox inputTitle={'PASSWORD'} value={password} setValue={setPassword}
      autoComplete='password'
      secureTextEntry={true} />
      </View>
      {/* <Text>{JSON.stringify({name,email,password},null,4)}</Text> */}
      <SubmitButon btnTitle='Register'
      loading={loading}
      handleSubmit={handleSubmit}
      />
      <Text style = {styles.linkText}>
        Already Register Please Press {" "} 
        <Text
         style={styles.link}
         onPress={()=> navigation.navigate("Login")}
         >LOGIN</Text>{" "}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#90ee90',
        
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



export default Register