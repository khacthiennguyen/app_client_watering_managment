import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const SubmitButon = ({handleSubmit,btnTitle,loading}) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.btnText}>
        {loading ? 'Please wait...' : btnTitle}
        </Text>
        
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    submitBtn:{
        backgroundColor:'#000000',
        height:50,
        marginHorizontal:25,
        borderRadius: 100,
        justifyContent:'center',
        marginBottom:20,
        overflow:'hidden',
    },

    btnText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:24,
        fontWeight:'400'
    }
})

export default SubmitButon