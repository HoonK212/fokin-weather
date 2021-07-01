// import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "6f9e3a966e460e6814c8c1945d8a0c06";

// export default function App() {
//   return <Loading />;
// }

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather
      }
    } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp
    });
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.yellowView}>
//         <Text>Hi</Text>
//       </View>
//       <View style={styles.blueView}>
//         <Text>Hello</Text>
//       </View>
//       {/* <StatusBar style="auto" /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'center',
//     justifyContent: 'center',
//   },
//   yellowView: {
//     flex: 2,
//     backgroundColor: "yellow",
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   blueView: {
//     flex: 3,
//     backgroundColor: "blue",
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
