import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import { connect } from "react-redux";
import styles from "../css/styles";
import Modal from "react-native-modal"

import { RESET_PREDICTION } from "../../store/actions";

class PredictionModal extends Component {
    reset = () => {
        this.props.resetPrediction()
    };
    render() {
        let { prediction, predictions } = this.props
        return (
            <Modal isVisible={prediction} >
                <View style={{ flex: 1 }} className={styles.modal}>
                    <Text>Hello!</Text>
                    <Button title="Hide modal" onPress={this.reset} />
                </View>
            </Modal >
        )
    }
}
const mapStateToProps = state => {
    let { prediction, predictions } = state
    return { prediction, predictions }
}
const mapDispatchToProps = dispatch => {
    return {
        resetPrediction() {
            dispatch({ type: RESET_PREDICTION });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PredictionModal)

