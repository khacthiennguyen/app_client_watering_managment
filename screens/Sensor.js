import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { SensorContext } from "../context/sensorContext";
import SensorManagment from "../components/SensorTab/SensorManagment";
import { SensorRealtimeContext, SensorRealtimeProvide } from "../context/sensorRealTimeContext";

const Sensor = () => {
    //globel state
    const [state] = useContext(AuthContext);
    const [sensor] = useContext(SensorContext);
    const [sensorDataRT] = useContext(SensorRealtimeContext);
    

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <SensorManagment sensor={sensor} sensorDataRT={sensorDataRT}/>
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
    marginTop: 8,
  },
});

export default Sensor;
