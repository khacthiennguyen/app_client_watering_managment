import { View, Text,StyleSheet ,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios';

const BtnWater = ({sensorId}) => {
  const [pressed, setPressed] = useState(false);

  const handlePress = async () => {
    // Nếu nút được nhấn khi đang ở trạng thái màu xanh
    if (!pressed) {
      try {
        // Gọi API để bật chế độ tự động tưới nước
        await axios.post(`/sensor/watering/${sensorId}`);
        // Cập nhật trạng thái của nút và màu sắc
        setPressed(true);
      } catch (error) {
        console.error('Error calling autowater API:', error);
      }
    } else {
      try {
        // Gọi API để tắt chế độ tự động tưới nước
        await axios.post(`/sensor/stopWatering/${sensorId}`);
        // Cập nhật trạng thái của nút và màu sắc
        setPressed(false);
      } catch (error) {
        console.error('Error calling offautowater API:', error);
      }
    }
  };

  return (
      <TouchableOpacity onPress={handlePress} style={[styles.button, { backgroundColor: pressed ? 'red' : 'green' }]}>
          <Text style={styles.buttonText}>{pressed ? 'Stop' : 'Press to water'} </Text>
      </TouchableOpacity>
    );
  };
    
    const styles = StyleSheet.create({
      button: {
        width: 100, 
        height: 100,
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
      },

      buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
      },
    });

export default BtnWater