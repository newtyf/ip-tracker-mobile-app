import React, {useState} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Input} from './Input';
import {Color} from '../types/Colors';
import Config from 'react-native-config';
import Mapbox from '@rnmapbox/maps';
import {Annotation} from './Annotation';
import {Location} from '../types/Location';
import {LocationCard} from './LocationCard';

Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(Config.API_KEY_MAPBOX as string);

Mapbox.setConnected(true);

export const Main = () => {
  const [ip, setip] = useState<string>('');
  const [location, setlocation] = useState<Location>();

  const [loding, setloding] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>(
    'Obteniendo localizacion...',
  );

  const getGeolocalizattion = async () => {
    if (ip.length === 0) {
      Alert.alert('Debe ingresar una ip valida');
      return;
    }
    setloding(true);
    setlocation(undefined);
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${Config.API_KEY_IPIFY}&ipAddress=${ip}`,
      );
      const locationData: {location: Location; isp: string} =
        await response.json();
      locationData.location.ip = ip;
      locationData.location.isp = locationData?.isp;
      setlocation(locationData.location);
      setloding(false);
    } catch (error) {
      console.log(error);
      setlocation(undefined);
      setLoadingText('No se encontro su ip...');
    } finally {
      setTimeout(() => {
        setLoadingText('Obteniendo localizacion...');
        setloding(false);
      }, 1000);
    }
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
          {loding && <Text style={styles.loader}>{loadingText}</Text>}
          <LocationCard location={location} />
        </View>
      </ImageBackground>
      <View style={styles.map}>
        {location ? (
          <Mapbox.MapView style={styles.mapStyle}>
            <Mapbox.Camera
              zoomLevel={12}
              centerCoordinate={[location.lng, location.lat]}
            />
            <Annotation coordinates={[location.lng, location.lat]} />
          </Mapbox.MapView>
        ) : (
          <Mapbox.MapView style={styles.mapStyle}>
            <Mapbox.Camera zoomLevel={12} centerCoordinate={[-5, 55]} />
            <Annotation coordinates={[-5, 55]} />
          </Mapbox.MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  map: {
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
    top: -300,
  },
  containerIP: {
    alignItems: 'center',
    maxHeight: 300,
    minHeight: 150,
    width: '100%',
    position: 'relative',
    zIndex: 20,
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
    color: Color.Ligth,
  },
  loader: {
    color: Color.Ligth,
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
});

// 190.237.10.253
