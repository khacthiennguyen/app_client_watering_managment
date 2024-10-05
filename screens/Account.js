import { View, Text, StyleSheet,Image, TextInput,TouchableOpacity ,ScrollView} from "react-native";
import React, { useContext,useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  //global state
  const [state,setState] = useContext(AuthContext);
  const {user,token} = state
  //local state
  const [name,setName] = useState(user ?.name)
  const [password,setPassword] = useState(user ?.password)
  const [email] = useState(user ?.email)
  const [loading,setLoading] = useState(false)

  //handle Update user
  const handleUpdate = async ()=>{
    try {
      setLoading(true)
      const {data} = await axios.put('/auth/update-user',{
        name,password,email
      })
      setLoading(false)
      let UD = JSON.stringify(data)
      setState({...state,user:UD?.updateUser})
      alert(data && data.message)
     
    } catch (error) {
      alert(error.response.data.message)
      setLoading(false)
      console.log(error)
      
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{alignItems:'center'}}>
        <Image source = {{
          uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCS3uMVc54NYJHXFUSIUFZrI3Zp00EZ6KcA&s'
        }} 
        style={{height:200, width:200,borderRadius:100}}   
        />
      </View>
      <View style={styles.inputContaniner}>
        <Text style={styles.inputText}>Name</Text>
        <TextInput value={name} style={styles.inputBox} onChangeText={(text)=>setName(text)}/>
      </View>
      <View style={styles.inputContaniner}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput value={email} editable={false} style={styles.inputBox}/>
      </View>
      <View style={styles.inputContaniner}>
        <Text style={styles.inputText}>Role</Text>
        <TextInput value={state?.user.role}  editable={false} style={styles.inputBox}/>
      </View>
      <View style={styles.inputContaniner}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput value={password} style={styles.inputBox}  onChangeText={(text)=>setPassword(text)}
        secureTextEntry={true}
        />
      </View>
      <View style={{alignItems:"center"}}>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
          <Text style={styles.updateBtnText}>{loading?'Please Wait...':'Update Profile'}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff", borderRadius: 100 }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
  },
  inputContaniner:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center"
  },
  inputText :{
    fontWeight:'bold',
    width:70,
    color:'gray',


  },
  inputBox:{
    width:250,
    height:30,
    backgroundColor:'#ffffff',
    marginLeft:10,
    fontSize:18,
    borderRadius:10,
    paddingLeft:20,
  },
  updateBtn:{
    backgroundColor:'black',
    color:'white',
    height:40,
    width:250,
    borderRadius:100,
    marginTop:30,
    alignItems:'center',
    justifyContent:'center'
  },
  updateBtnText:{
    color:'#ffffff',
    fontSize:18
  }

});

export default Account;
