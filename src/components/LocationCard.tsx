import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Location} from '../types/Location';
import {Color} from '../types/Colors';

type LocationCardProps = PropsWithChildren<{location: Location | undefined}>;

export const LocationCard = ({location}: LocationCardProps) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
    fontSize: 20,
    color: Color.Dark,
    marginTop: 10,
    marginBottom: 10,
  },
  labelCard: {
    fontSize: 10,
    color: Color.BlueDark,
  },
});
