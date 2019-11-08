import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements"
import { connect } from "react-redux";

import { DISCARD_PIC } from "../../store/actions"
import styles from "../css/styles"

class Header extends Component {
    goBack = () => {
        this.props.discard()
    }
    render() {
        return (
            <View className={styles.header}>
                {this.props.showBackButton ? <Icon
                    name={"arrow-back"}
                    //iconStyle={}
                    size={33}
                    onPress={() => this.goBack()}
                /> : null}
                <Text
                    className={styles.headerText}
                >{this.props.text}</Text>

                {//Just to align the header text in the middle, no actual functionality
                    this.props.showBackButton ? <Icon
                        name={"arrow-back"}
                        iconStyle={{ color: "transparent" }}
                        size={33}
                    /> : null}
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        discard() {
            dispatch({ type: DISCARD_PIC })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);