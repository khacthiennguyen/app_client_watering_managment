import React, { useState, useEffect, useContext } from "react";
import { View, Switch, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { SensorContext } from "../../context/sensorContext";

const AutoWaterSwitch = ({sensorId,status}) => {
  const [sensor, setSensor, getallUnique] = useContext(SensorContext);
  const [isEnabled, setIsEnabled] = useState(status === "true");

  useEffect(() => {
    setIsEnabled(status === "true");
  }, [status]);

  const toggleSwitch = async () => {
    const newState = !isEnabled;  // Determine new state based on the current isEnabled state

    const endpoint = newState ? `sensor/enableAutoWater/${sensorId}` : `sensor/disableAutoWater/${sensorId}`;

    try {
      const response = await axios.put(endpoint);
      if (response.status === 200) {
        setIsEnabled(newState); // Update state only if API call was successful
        Alert.alert("Response", response.data.message);
        getallUnique(); // Optionally reload all sensors if necessary
      } else {
        throw new Error('Server responded with an error.');
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to change sensor status");
      // Do not update state here as it is already handled above
    }
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AutoWaterSwitch