import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client/dist/socket.io';

const SensorContext = createContext();

const SensorProvide = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false); // for funtion
  const [sensor, setSensor] = useState([]);

  //ws for sensor context
  useEffect(() => {
    const socket = io('http://192.168.30.1:8090', { json: false });
    return () => {
      socket.disconnect();
    };
  }, []);

  // reload funtion for callback
  // const triggerReload = () => {
  //   setReload(prev => !prev);  // Toggle the state to trigger useEffect
  // };

  //get All sensor be unique
  const getallUnique = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("sensor/getallUnique");
      setLoading(false);
      setSensor(data?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //initial sensor
  useEffect(() => {
    getallUnique();
  }, []); //reload



  return (
    <SensorContext.Provider value={[sensor, setSensor, getallUnique]}>
      {children}
    </SensorContext.Provider>
  );
};

export { SensorContext, SensorProvide };
