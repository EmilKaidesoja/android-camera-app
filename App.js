import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slick from 'react-native-slick';
import CameraContainer from "./src/screens/CameraContainer";
import AuxWrapper from "./src/Utils/AuxWrapper";

export default function App() {
  return (
    <Slick style={styles.wrapper} loop={false}>
      <AuxWrapper style={styles.cameraView}>
        <CameraContainer />
      </AuxWrapper>
      <AuxWrapper style={styles.savedImagesView}>
        <Text style={styles.text}>Images</Text>
      </AuxWrapper>
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
