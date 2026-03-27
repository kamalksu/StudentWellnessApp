import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { auth } from '../../firebase/config';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomeHeader() {
  const user = auth.currentUser;
  const name = user?.displayName || 'Student';
  const [location, setLocation] = useState('Getting location...');
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocation('Location unavailable');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;

        // Location name
        const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (place) {
          setLocation(`${place.city}, ${place.region}`);
        }

        // Weather from OpenMeteo (no API key needed)
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`
        );
        const weatherData = await weatherRes.json();
        if (weatherData.current_weather) {
          setTemperature(Math.round(weatherData.current_weather.temperature));
        }
      } catch (error) {
        setLocation('Location unavailable');
      }
    };
    getLocationAndWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/owl.png')}
          style={styles.owl}
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            {getGreeting()}, <Text style={styles.name}>{name}</Text>
          </Text>
          <Text style={styles.date}>
            {getFormattedDate()}
            {temperature !== null ? `${temperature}°F` : ''}
          </Text>
          <Text style={styles.campus}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  owl: {
    width: 56,
    height: 56,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2DD4BF',
  },
  date: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  campus: {
    fontSize: 13,
    color: '#666',
    marginTop: 1,
  },
});