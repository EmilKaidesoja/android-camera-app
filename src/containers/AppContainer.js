import React, { Component } from "react";
import { connect } from "react-redux";
import Slick from "react-native-slick";
import { StyleSheet, Alert, BackHandler, View, Text } from "react-native";

import {
  askCameraPermission,
  askCameraRollPermission,
  slickSwipeHandler,
  RESET_ERROR,
  RESET_PREDICTION,
  DISCARD_PIC,
  SLICK_CONFIG,
  SET_SLICK_INDEX
} from "../../store/actions";

import CameraContainer from "../screens/Camera/CameraContainer";
import AuxWrapper from "../Utils/AuxWrapper";
import History from "../screens/Images/History";
import PredictionModal from "../screens/PredictionModal";
import Picture from "../screens/Picture";
import { ScreenOrientation } from "expo";
import Header from "../screens/Header";
import Toolbar from "../screens/Toolbar";

let _ = require("underscore");

class AppContainer extends Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    this.props.askPermissions();
    BackHandler.addEventListener("hardwareBackPress", () => this.backPressed());
    this.props.configSlick(this.slick);
  }

  backPressed = () => {
    if (this.props.openImage) {
      this.props.discard();
      return true;
    } else if (this.props.prediction) {
      this.props.reset();
      return true;
    }
  };

  resetError = () => {
    this.props.reset();
  };

  handleSwipe = (e, state) => {
    this.props.handleSlickSwipe(state.index);
  };

  render() {
    const slickSettings = {
      style: inlineStyles.wrapper,
      loop: false,
      showsPagination: false,
      index: this.props.slickIndex,
      onMomentumScrollEnd: (e, state) => this.handleSwipe(e, state)
    };
    if (this.props.error) {
      Alert.alert(
        "Oops!",
        "Something went terribly wrong!",
        [{ text: "Okay", onPress: () => this.resetError() }],
        { cancelable: false }
      );
    }
    return (
      <AuxWrapper>
        <Slick
          {...slickSettings}
          ref={ref => {
            this.slick = ref;
          }}
        >
          <AuxWrapper style={inlineStyles.cameraView}>
            <Header text={"Info"} />
            <Text>BOOM BABY!</Text>
          </AuxWrapper>
          <AuxWrapper style={inlineStyles.cameraView}>
            <Header text={"Camera"} />
            <CameraContainer />
          </AuxWrapper>
          <AuxWrapper style={inlineStyles.savedImagesView}>
            <Header text={"Images"} />
            <History />
          </AuxWrapper>
        </Slick>
        {this.props.openImage ? <Picture /> : <Toolbar cameraActive={true} />}
        <PredictionModal />
      </AuxWrapper>
    );
  }
}

const mapStateToProps = state => {
  let {
    hasCameraPermission,
    hasCameraRollPermission,
    openImage,
    error,
    prediction,
    slickIndex
  } = state;
  return {
    hasCameraPermission,
    hasCameraRollPermission,
    openImage,
    error,
    prediction,
    slickIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    askPermissions() {
      dispatch(askCameraPermission());
      dispatch(askCameraRollPermission());
    },
    reset() {
      dispatch({ type: RESET_ERROR });
    },
    discard() {
      dispatch({ type: DISCARD_PIC });
    },
    reset() {
      dispatch({ type: RESET_PREDICTION });
    },
    configSlick(slickRef) {
      dispatch({ type: SLICK_CONFIG, slick: slickRef });
    },
    handleSlickSwipe(index) {
      dispatch({ type: SET_SLICK_INDEX, index: index });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

const inlineStyles = StyleSheet.create({
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
