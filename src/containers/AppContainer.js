import React, { Component } from "react";
import { connect } from "react-redux";
import Slick from "react-native-slick";
import { StyleSheet, Text } from "react-native";

import { askCameraPermission, askCameraRollPermission } from "../../store/actions";

import CameraContainer from "../screens/Camera/CameraContainer";
import AuxWrapper from "../Utils/AuxWrapper";
import History from "../screens/Images/History";
import PredictionModal from "../screens/PredictionModal";
import Picture from "../screens/Picture";


class AppContainer extends Component {

  componentDidMount() {
    this.props.askPermissions()
  }

  render() {
    return (
      <AuxWrapper>
          <Slick style={styles.wrapper} loop={false} showsPagination={false}>
            <AuxWrapper style={styles.cameraView}>
              <CameraContainer />
            </AuxWrapper>
            <AuxWrapper style={styles.savedImagesView}>
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
  let { hasCameraPermission, hasCameraRollPermission, openImage } = state
  return { hasCameraPermission, hasCameraRollPermission, openImage };
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
