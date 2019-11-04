import React, { Component } from "react";
import { View, Image } from "react-native";
import AuxWrapper from "../Utils/AuxWrapper";
import styles from "../css/styles"

class Img extends Component {
    render() {
        return (
                <Image source={{ uri: this.props.imgUri }} className={styles.img} />
        )
    }
} export default Img