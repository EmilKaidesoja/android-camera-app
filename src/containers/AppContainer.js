import React, { Component } from "react";
import { connect } from "react-redux";
import Slick from "react-native-slick";
import { StyleSheet, Text, View, Alert } from "react-native";

import { askCameraPermission, askCameraRollPermission, RESET_ERROR } from "../../store/actions";

import CameraContainer from "../screens/Camera/CameraContainer";
import AuxWrapper from "../Utils/AuxWrapper";
import History from "../screens/Images/History";
import PredictionModal from "../screens/PredictionModal";
import Picture from "../screens/Picture";
import { ScreenOrientation } from "expo";
import Header from "../screens/Header";


class AppContainer extends Component {

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    this.props.askPermissions()
  }

  resetError = () => {
    this.props.reset()
  }

  render() {
    if (this.props.error) {
      Alert.alert(
        'Oops!',
        'Something went terribly wrong!',
        [
          { text: 'Okay', onPress: () => this.resetError() },
        ],
        { cancelable: false },
      );
    }
    return (
      <AuxWrapper>
        <Slick style={styles.wrapper} loop={false} showsPagination={false}>
          <AuxWrapper style={styles.cameraView}>
            <Header text={"Camera"} />
            <CameraContainer />
          </AuxWrapper>
          <AuxWrapper style={styles.savedImagesView}>
            <Header text={"Images"} />
            <History />
          </AuxWrapper>
        </Slick>
        {this.props.openImage ? <Picture /> : null}
        <PredictionModal />
      </AuxWrapper>
    );
  }
}

const mapStateToProps = state => {
  let { hasCameraPermission, hasCameraRollPermission, openImage, error } = state
  return { hasCameraPermission, hasCameraRollPermission, openImage, error };
};

const mapDispatchToProps = dispatch => {
  return {
    askPermissions() {
      dispatch(askCameraPermission())
      dispatch(askCameraRollPermission())
    },
    reset() {
      dispatch({ type: RESET_ERROR })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

const styles = StyleSheet.create({
  wrapper: {
    color: "#fff"
  },
  cameraView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  savedImagesView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold"
  }
});
