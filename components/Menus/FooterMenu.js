import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation,useRoute } from '@react-navigation/native'
const FooterMenu = () => {
  //hooks
  const navigation=useNavigation()
  const route = useRoute()

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
        <FontAwesome5 name='home' style={styles.iconStyle} color={route.name === 'Home' && 'red'}  />
      <Text>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> navigation.navigate('Sensor')}>
    <FontAwesome5 name='wave-square' style={styles.iconStyle} color={route.name === 'Sensor' && 'red'}/>
      <Text>Sensor</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> navigation.navigate('Analyst')}>
    <FontAwesome5 name='table' style={styles.iconStyle} color={route.name === 'Analyst' && 'red'}/>
      <Text>Analyst</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> navigation.navigate('Account')}> 
    <FontAwesome5 name='user-circle' style={styles.iconStyle} color={route.name === 'Account' && 'red'}/>
      <Text>Account</Text>
    </TouchableOpacity>
    </View>
   
  )
}
const styles = StyleSheet.create({
    container:{
      flexDirection:'row',
      margin:10,
      justifyContent: 'space-between',
  
    },
    iconStyle:{
        marginBottom:3,
        alignSelf:'center',
        fontSize:25,
    }
  })
  
export default FooterMenu