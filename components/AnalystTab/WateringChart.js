import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const WateringChart = ({ sensorData }) => {

  // Tạo đối tượng để lưu trữ dữ liệu cho biểu đồ
  const chartData = {};
  sensorData.sort((a, b) => a.sensorId.localeCompare(b.sensorId));

  // Phân tích dữ liệu và tạo dữ liệu cho biểu đồ
  sensorData.forEach((data) => {
    const sensorId = data.sensorId;
    if (!chartData[sensorId]) {
      chartData[sensorId] = {
        day: [],
        time: [],
        data: [],
        status: null,
      };
    }

    if (chartData[sensorId].status === null && data.activate) {
      chartData[sensorId].status = data.activate;
    }
    chartData[sensorId].day.push(data.day); // Sử dụng day hoặc time làm nhãn trục x
    chartData[sensorId].time.push(data.time); // Sử dụng day hoặc time làm nhãn trục x
    chartData[sensorId].data.push(parseInt(data.moisture)); // Chuyển moisture sang số và thêm vào dữ liệu
  });

  // Biểu đồ cho mỗi sensorId
  const charts = Object.keys(chartData).map((sensorId) => {
      // Chọn một số giá trị thời gian để hiển thị trên trục x (ví dụ: mỗi 5 giá trị)
  const filteredTimeLabels = chartData[sensorId].day.filter((_, index) => index % 8 === 0);
    return (
      <View key={sensorId} style={styles.chartContainer}>
        <View style={styles.haderCard}>
          <Text style={styles.chartTitle}>Sensor {sensorId} {" "}</Text>
          <Text style={styles.chartTitle}>
            Status: {chartData[sensorId].status}
          </Text>
        </View>

        <LineChart
          data={{
            // labels: filteredTimeLabels, //chartData[sensorId].time ,
            datasets: [{ data: chartData[sensorId].data }],
          }}
          width={screenWidth - 30}
          height={220}
          yAxisLabel={""} //mmoi
          xAxisLabel={""}
          chartConfig={{
            backgroundColor: "#0D47A1",
            backgroundGradientFrom: "#1976D2",
            backgroundGradientTo: "#2196F3",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            withInnerLines: false, // Loại bỏ đường kẻ nội tại
            withDots: false, // Loại bỏ điểm marker
          }}
          bezier
          style={styles.chart}
        />
      </View>
    );
  });

  return <View style={styles.container}>{charts}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    borderRadius: 18,
  },
  haderCard: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  containerNodata: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

export default WateringChart;
