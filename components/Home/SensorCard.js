import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SensorCard = ({ sensor, sensorDataRT }) => {
  // Lọc các sensor có activate: true
  const activatedSensors = sensor.filter((s) => s.activate === "true");
  const uniqueSensorsArray = Object.values(activatedSensors);

  // Chuyển đổi sensorDataRT thành mảng
  // const sensorDataRTArray = Object.values( console.log());

  return (
    <View>
      <Text style={styles.heading}>
        Total Sensors is Activate: {uniqueSensorsArray.length}
      </Text>
      {uniqueSensorsArray.map((sensor) => {
          // Lấy dữ liệu từ sensorDataRT tương ứng với sensorId của sensor hiện tại
        const dataForCurrentSensor = sensorDataRT[sensor.sensorId] || {};
        // console.log(dataForCurrentSensor)
        return (
          <View style={styles.card} key={sensor._id}>
            <View style={styles.headerCard}>
              <Text>
                <FontAwesome5 name="calendar-alt" /> {dataForCurrentSensor?.day}
              </Text>
              <Text>
                <FontAwesome5 name="clock" /> {dataForCurrentSensor?.time}
              </Text>
            </View>
            <View>
              <Text style={styles.title}>Sensor ID: {sensor.sensorId}</Text>
              <Text style={styles.info}>
                Moisture: {dataForCurrentSensor?.moisture}{" "}
              </Text>
              <Text style={styles.info}>Location: {sensor.location}</Text>
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
    marginBottom: 10,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 20,
  },
  hr: {
    borderBottomWidth: 0.5,
  },
  info: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default SensorCard;
