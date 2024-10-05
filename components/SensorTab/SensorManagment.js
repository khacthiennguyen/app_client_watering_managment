// SensorManagment.js
import { View, Text, StyleSheet, Switch } from "react-native";
import React from "react";
import StatusSwitch from "./StatusSwitch";
import AutoWaterSwitch from "./AutoWaterSwitch";
import BtnWater from "./BtnWater";

const SensorManagment = ({ sensor, sensorDataRT }) => {
  // Chuyển đổi đối tượng thành mảng
  const uniqueSensorsArray = Object.values(sensor);
  return (
    <View>
      <Text style={styles.heading}>
        Total Sensors is Activate: {uniqueSensorsArray.length}
      </Text>
      {uniqueSensorsArray.map((sensor) => {
        const dataForCurrentSensor = sensorDataRT[sensor.sensorId] || null;
        // console.log(dataForCurrentSensor)
        return (
          <View style={styles.card} key={sensor._id}>
            <View style={styles.headerCard}>
              <Text style={styles.title}>Sensor ID: {sensor.sensorId}</Text>
              <Text style={styles.title}>Moisture: { dataForCurrentSensor == null ? "Not activate": dataForCurrentSensor?.moisture}</Text>
            </View>
            {/* status */}
            <View style={styles.rowStatus}>
              <Text>Status: </Text>
              <Text>{sensor.activate}</Text>
              <View>
                <StatusSwitch
                  sensorId={sensor.sensorId}
                  status={sensor.activate}
                />
              </View>
            </View>
            {/* auto water */}
            <View style={styles.rowStatus}>
              <Text>Auto Water: </Text>
              <Text>{sensor.autowater}</Text>
              <View>
                <AutoWaterSwitch
                  sensorId={sensor.sensorId}
                  status={sensor.autowater}
                />
              </View>
            </View>
            {/* Button Water */}
            <View style={styles.btnWatercontainer}>
              <BtnWater sensorId={sensor.sensorId}/>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 20,
    marginVertical: 10,
    overflow: "visible",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  hr: {
    borderBottomWidth: 0.5,
  },
  rowStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnWatercontainer: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SensorManagment;
