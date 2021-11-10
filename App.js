import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "b99ddc3d51afcea3742755b831ee1ff7";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);   //daily의 정보 들어가기
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {   //location 요청 거부시
      setOk(false);  //ok의 state == false
    }
    const {
      coords: { latitude, longitude },  //위도와 경도
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });  //현재의 위치(위도, 경도) 찾기
    const location = await Location.reverseGeocodeAsync(  //위도와 경도를 이용해 위치찾기
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);  //위도와 경도를 통해 찾은 위치의 응답으로 도시의 이름
    const response = await fetch( //도시의 이름으로 날씨정보 받는 API사용_openweathermap
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);  //daily만 day에 넣기
  };
  useEffect(() => { //hook
    getWeather(); //컴포넌트가 마운트 될 때 호출됨 - js/react
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (  //정보의 길이가 0일 때
          <View style={styles.day}>
            <ActivityIndicator  //수신 전 로딩으로
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : ( //정보가 있다면
          days.map((day, index) => (  //days안의 각 day를 컴포넌트로 바꾸고 return
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))  //react
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#58CCFF",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tinyText: {
    fontSize: 20,
  },
});