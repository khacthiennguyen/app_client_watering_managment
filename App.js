// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation';



export default function App() {

  
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
