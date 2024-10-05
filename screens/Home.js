import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { SensorContext } from "../context/sensorContext";
import SensorCard from "../components/Home/SensorCard";
import { SensorRealtimeContext } from "../context/sensorRealTimeContext";
import io from 'socket.io-client/dist/socket.io';
const Home = () => {
  //globel state
  const [state] = useContext(AuthContext);
  const [sensor] = useContext(SensorContext);
  const [sensorDataRT] = useContext(SensorRealtimeContext)

  return (
    <View style={styles.container}>
      {/* <View style={{alignItems:'center'}}>
        <Text style={styles.heading}>Create sensor</Text>
        <Text>{JSON.stringify(state,null,4)}</Text>
      </View> */}
      <ScrollView>
      {/* <Text>{JSON.stringify(sensorDataRT,null,4)}</Text> */}
      {/* <Text>{dataSensor}</Text> */}
      <Text style = {styles.hello}>Hello <Text>{state.user.name}</Text></Text>
        <SensorCard sensor={sensor} sensorDataRT={sensorDataRT}/>
      </ScrollView>
      <View style={{ backgroundColor:'#ffffff' ,borderRadius:100}}>
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
    // marginTop: 20,
  },
  hello:{
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign:'center',
    marginBottom:10,
    color:'rgb(40, 167, 69)'
  },

  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    
  },
});

export default Home;
