import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client';

const SensorRealtimeContext = createContext();

const SensorRealtimeProvide = ({children}) => {
  const [sensorDataRT ,setsensorDataRT] = useState([]);


    useEffect(() => {
        const socket = io('http://192.168.9.1:8090', { json: true });

         // Gửi thời gian hiện tại tới server mỗi 3 giây
        //  const interval = setInterval(() => {
        //     const currentTime = new Date().getTime();
        //     socket.emit("SENSORDATA", currentTime);
            // socket.on("SENSORDATA-SERVER",(data)=>{
            //     console.log("SENSORDATA-SERVER:", data)
            // })
            // console.log("timetest:", currentTime);
        // }, 3000);

        socket.on("SENSORDATA-SERVER",(data)=>{
            console.log("SENSORDATA-SERVER:", data)
            setsensorDataRT(prevState => {
              return {
                ...prevState,
                [data.sensorId]: data // Giả sử data chứa sensorId
              };
            });
          });
        return () => {
             socket.off("SENSORDATA-SERVER"); 
            // clearInterval(interval);
            socket.disconnect();
        };
    }, []);


  return (
    <SensorRealtimeContext.Provider value={[sensorDataRT]} >
    {children}
    </SensorRealtimeContext.Provider>
  )
}

export {SensorRealtimeProvide,SensorRealtimeContext}