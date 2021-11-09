import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="black" />
      <View style={styles.city}> 
        <Text style={styles.cityName}>Busan</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({  //css라고 생각!
  container: {
    flex: 1,  //flex
    backgroundColor: "#58CCFF",
  },
  city: {
    flex: 1,
    backgroundColor: "#58CCFF",
    alignItems: 'center',
    justifyContent: 'center',
  },
  weather: {
    flex: 3,
  },
  cityName: {
    fontSize: 45,
    fontWeight: "500",
  },
  day: {
    flex: 1,
    alignItems: 'center',
  },
  temp: {
    marginTop: 30,
    fontSize: 150,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  }
})