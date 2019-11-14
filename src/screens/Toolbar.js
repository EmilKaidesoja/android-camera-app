import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { slickSwipeHandler } from "../../store/actions";

import styles from "../css/camera";

class Toolbar extends Component {
  activeIconHandler = origin => {
    switch (origin) {
      case "info": {
        if (this.props.slickIndex == 0) {
          return styles.iconActive;
        } else {
          return styles.icon;
        }
      }
      case "cam": {
        if (this.props.slickIndex == 1) {
          return styles.iconActive;
        } else {
          return styles.icon;
        }
      }
      case "gallery": {
        if (this.props.slickIndex == 2) {
          return styles.iconActive;
        } else {
          return styles.icon;
        }
      }
    }
  };

  navigateTo = navTo => {
    let { slickIndex } = this.props;
    this.props.scrollBy(navTo - slickIndex);
  };
  render() {
    return (
      <View className={styles.toolbar}>
        <View style={{ flex: 3 }}>
          <Icon
            name={"info"}
            iconStyle={this.activeIconHandler("info")}
            size={30}
            onPress={() => this.navigateTo(0)}
            underlayColor={"#2a2626"}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Icon
            name={"camera-alt"}
            iconStyle={this.activeIconHandler("cam")}
            size={30}
            onPress={() => this.navigateTo(1)}
            underlayColor={"#2a2626"}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Icon
            name={"photo-library"}
            iconStyle={this.activeIconHandler("gallery")}
            size={30}
            onPress={() => this.navigateTo(2)}
            underlayColor={"#2a2626"}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let { slick, slickIndex } = state;
  return {
    slick,
    slickIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scrollBy(amount) {
      dispatch(slickSwipeHandler(amount));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
