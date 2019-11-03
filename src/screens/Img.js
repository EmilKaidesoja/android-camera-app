import React, { Component } from "react";
import { View, Image } from "react-native";
import AuxWrapper from "../Utils/AuxWrapper";

class Img extends Component {
    render() {
        return (
                <Image source={{ uri: this.props.imgUri }} style={{ width: 150, height: 250 }} />
        )
    }
} export default Img