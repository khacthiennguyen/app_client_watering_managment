import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FooterMenu from "../components/Menus/FooterMenu";
import WateringChart from "../components/AnalystTab/WateringChart";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const Analyst = () => {
  const [frequency, setFrequency] = useState("1");
  const [dataAnalyst, setAnalystData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAnalystData();
  }, [frequency]);

  const getAnalystData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("sensor/getAnalystic", {
        params: { frequency },
      });
      setLoading(false);
      setAnalystData(response.data.data);
      setErrorMessage(""); // Clear error message if data is successfully fetched
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to fetch data. Please try again."); // Set error message if there's an error
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Text>{frequency}</Text> 
        <Text>{JSON.stringify(dataAnalyst)}</Text> */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>Frequency:</Text>
          <Picker
            selectedValue={frequency}
            style={[styles.dropdown, { width: 200 }]}
            onValueChange={(itemValue) => setFrequency(itemValue.toString())}
          >
            <Picker.Item label="Last 24 Hours" value="1" />
            <Picker.Item label="Last 3 Days" value="3" />
            <Picker.Item label="Last 7 Days" value="7" />
            <Picker.Item label="Last 1 Month" value="30" />
          </Picker>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        ) : errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <WateringChart sensorData={dataAnalyst} />
        )}
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
    marginTop: 20,
    overflow: "hidden",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    width: 150,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Analyst;
