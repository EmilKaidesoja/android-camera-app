import React, { Component } from "react";
import { connect } from "react-redux";
import Slick from "react-native-slick";
import { StyleSheet, Text } from "react-native";

import CameraContainer from "../screens/CameraContainer";
import AuxWrapper from "../Utils/AuxWrapper";
import History from "../screens/History";
import { askCameraPermission, askCameraRollPermission } from "../../store/actions";

class AppContainer extends Component {

  componentDidMount() {
      this.props.askPermissions()
  }

  render() {
    return (
      <Slick style={styles.wrapper} loop={false}>
        <AuxWrapper style={styles.cameraView}>
          <CameraContainer />
        </AuxWrapper>
        <AuxWrapper style={styles.savedImagesView}>
          <History />
        </AuxWrapper>
      </Slick>
    );
  }
}

const mapStateToProps = state => {
  let { hasCameraPermission, hasCameraRollPermission } = state
  return { hasCameraPermission, hasCameraRollPermission };
};

const mapDispatchToProps = dispatch => {
  return {
    askPermissions() {
      dispatch(askCameraPermission())
      dispatch(askCameraRollPermission())
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
