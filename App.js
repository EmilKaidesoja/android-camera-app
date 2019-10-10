import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slick from 'react-native-slick';

export default function App() {
  return (
    <Slick style={styles.wrapper} >
      <View style={styles.cameraView}>
        <Text style={styles.text}>Camera</Text>
      </View>
      <View style={styles.savedImagesView}>
        <Text style={styles.text}>Images</Text>
      </View>
    </Slick>
  );
}

const styles = StyleSheet.create({
  wrapper: {
  },
  cameraView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedImagesView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
