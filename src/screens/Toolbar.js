import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import styles from "../css/camera"

class Toolbar extends Component {

    activeIconHandler = (origin) => {
        switch (origin) {
            case "cam": {
                if (this.props.cameraActive) {
                    return styles.iconActive
                } else {
                    return styles.icon
                }
            }
            case "gallery": {
                if (this.props.galleyActive) {
                    return styles.iconActive
                } else {
                    return styles.icon
                }
            }
            case "info": {
                if (this.props.infoActive) {
                    return styles.iconActive
                } else {
                    return styles.icon
                }
            }
        }
    }

    render() {
        return (
            <View className={styles.toolbar}>
                <View style={{ flex: 3 }}>
                    <Icon
                        name={"info"}
                        iconStyle={this.activeIconHandler("info")}
                        size={33} />
                </View>
                <View style={{ flex: 3 }}>
                    <Icon
                        name={"camera-alt"}
                        iconStyle={this.activeIconHandler("cam")}
                        size={40} />
                </View>
                <View style={{ flex: 3 }}>
                    <Icon
                        name={"photo-library"}
                        iconStyle={this.activeIconHandler("gallery")}
                        size={33} />
                </View>

            </View>
        )
    }
}
export default Toolbar
