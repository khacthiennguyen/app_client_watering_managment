import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './context/authContext'
import ScreenMenu from './components/Menus/ScreenMenu'
import { SensorProvide } from './context/sensorContext'
import { SensorRealtimeProvide } from './context/sensorRealTimeContext'

const RootNavigation = () => {
  return (
    <AuthProvider>
      <SensorProvide>
      <SensorRealtimeProvide>
      <ScreenMenu />
      </SensorRealtimeProvide>
      </SensorProvide>
    </AuthProvider>
  )
}

export default RootNavigation