import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface propsInput {
  getGeolocalizattion: () => void;
  onText: (text: string) => void;
}

export const Input = (props: propsInput) => {
  const {getGeolocalizattion, onText} = props;

  return (
    <View style={styles.inputSection}>
      <TextInput
        style={styles.input}
        onChangeText={onText}
        placeholder="192.176.30.20"
      />
      <TouchableOpacity
        style={styles.buttonArrow}
        onPress={() => getGeolocalizattion()}>
        <Image source={require('../assets/icon-arrow.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonArrow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  input: {
    backgroundColor: '#bdc3c7',
    minWidth: 250,
    padding: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
