import React, { Component } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { connect } from "react-redux";
import styles from "../css/styles";
import Modal from "react-native-modal";

import { RESET_PREDICTION } from "../../store/actions";
import AuxWrapper from "../Utils/AuxWrapper";

let _ = require("underscore");

class PredictionModal extends Component {
  reset = () => {
    this.props.resetPrediction();
  };
  render() {
    let { prediction, predictions, pictureSent } = this.props;
    let preds = _.map(predictions, pred => {
      if (!pred.pred.includes("e")) {
        return (
          <AuxWrapper key={_.uniqueId()}>
            <Text className={styles.modalText}>
              {`${pred.className}: ${pred.pred}%`}{" "}
            </Text>
          </AuxWrapper>
        );
      }
    });
    return (
      <Modal isVisible={prediction}>
        <View className={styles.modal}>
          <Text className={styles.text}>Predictions</Text>
          {preds}
          <TouchableOpacity onPress={this.reset} className={styles.modalButton}>
            <Text className={styles.modalButtonText}>Awesome!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  let { prediction, predictions, pictureSent } = state;
  return { prediction, predictions, pictureSent };
};
const mapDispatchToProps = dispatch => {
  return {
    resetPrediction() {
      dispatch({ type: RESET_PREDICTION });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PredictionModal);
