import React, { Component } from "react";
import { View, Button, Text, Image } from "react-native";
import { connect } from "react-redux";
import styles from "../css/styles";

class Picture extends Component {
    render() {
        return (
            <View className={styles.takenImageContainer} >
                <Image className={styles.takenImage}
                    source={{ uri: this.props.picSource }} />
                <Button
                    className={styles.discardButton}
                    onPress={this.props.discard}
                    title="Take new Photo" />
                <Button
                    className={styles.analyzeButton}
                    onPress={() => this.analyzePhoto()}
                    title="Analyze photo" />
            </View>
        )
    }
}
export default connect(null, null)(Picture)