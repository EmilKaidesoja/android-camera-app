import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../css/styles"

class Header extends Component {
    render() {
        return (
            <View className={styles.header}>
                <Text className={styles.headerText}>{this.props.text}</Text>
            </View>
        )
    }
} export default Header;