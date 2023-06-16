import React, {useState} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Input} from './Input';

export interface Location {
  ip: string;
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
  isp: string;
}

export const Main = () => {
  const [ip, setip] = useState<string>('');
  const [location, setlocation] = useState<Location>();
  const [loding, setloding] = useState<boolean>(false);

  const getGeolocalizattion = async () => {
    if (ip.length === 0) {
      Alert.alert('Debe ingresar una ip valida');
      return;
    }
    setloding(true);
    setlocation(undefined);
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_xOluqnJZrnwhKm4XWF3GH6HI5TUjq&ipAddress=${ip}`,
    );
    const locationData: {location: Location; isp: string} =
      await response.json();
    locationData.location.ip = ip;
    locationData.location.isp = locationData?.isp;
    setlocation(locationData.location);
    setloding(false);
  };

  const onText = (text: string) => {
    setip(text);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/pattern-bg-mobile.png')}
        style={styles.containerIP}>
        <Text style={styles.title}>IP Address Tracker</Text>
        <View>
          <Input getGeolocalizattion={getGeolocalizattion} onText={onText} />
          {loding && (
            <Text style={styles.text}>Obteniendo localizacion...</Text>
          )}
          <View>
            {location && (
              <View style={styles.locationCard}>
                <Text style={styles.labelCard}>IP ADDRESS</Text>
                <Text style={styles.textCard}>{location?.ip}</Text>
                <Text style={styles.labelCard}>LOCATION</Text>
                <Text
                  style={
                    styles.textCard
                  }>{` ${location?.city}, ${location?.region} ${location?.postalCode}`}</Text>
                <Text style={styles.labelCard}>TIMEZONE</Text>
                <Text style={styles.textCard}>{location?.timezone}</Text>
                <Text style={styles.labelCard}>ISP</Text>
                <Text style={styles.textCard}>{location?.isp}</Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
      <View style={styles.map}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2ecc71',
    position: 'relative',
    zIndex: 10,
  },
  containerIP: {
    alignItems: 'center',
    maxHeight: 300,
    width: '100%',
    position: 'relative',
    zIndex: 20,
  },
  locationCard: {
    width: 300,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 10,
  },
  textCard: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
  },
  labelCard: {
    fontSize: 14,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    color: '#fff',
  },
});

// 190.237.10.253
