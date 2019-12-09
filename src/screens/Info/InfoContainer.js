import React, { Component } from "react";
import { Text, View, Button, ScrollView, TouchableHighlight, TouchableOpacity, FlatList, ListView } from "react-native";
import styles from "../../css/styles";

let _ = require("underscore");

class Info extends Component {
  state = {
    status: false
  }

  toggleItemsView = () => {
    let tempStatus = this.state.status
    this.setState({ status: !tempStatus })
  }

  render() {
    const supportedObjects = [
      { key: "Cat" },
      { key: "Cup" },
      { key: "Dog" },
      { key: "Laptop" },
      { key: "Pizza" },
      { key: "Plant" },
      { key: "Scissors" },
      { key: "Watch" }]
    const tips = [
      { text: "Make sure there's one item in the photo" },
      { text: "Use flash for better color contrast" },
      { text: "Try different angles" },
      { text: "Unfortunately it's not perfect, yet" }]
    return (
      <View className={styles.infoContainer}>
        <View style={{ height: "95%" }}>
          <ScrollView>
            <Text className={styles.smallHeader}>Attempt at object recognition!</Text>
            <Text className={styles.infoUpperText}>
              Take a photo and see what our algorithm thinks of it! Our neural network has been
              taught to recognize 8 categories of objects. See them below.
          </Text>

            <TouchableOpacity
              className={styles.toggleButton}
              onPress={() => this.toggleItemsView()}>
              <Text className={styles.buttonText}>Items</Text>
            </TouchableOpacity>

            <View className={styles.list}>
              {this.state.status ?
                <FlatList data={supportedObjects}
                  numColumns={2}
                  renderItem={({ item }) => <Text className={styles.listItems}>{item.key}</Text>}
                /> : null}
            </View>
            <Text
              style={{
                textAlign: "center", marginTop: 15,
                fontWeight: "bold", fontSize: 23, paddingBottom: 5
              }}>
              Tips for better results
        </Text>
            <FlatList data={tips}
              keyExtractor={() => _.uniqueId()}
              renderItem={({ item }) => <Text
                style={{
                  textAlign: "center", fontSize: 17
                }}>- {item.text}</Text>}
            />

          </ScrollView>
        </View>
        <View className={styles.infoFooter}>
          <Text className={styles.infoFooterText}>
            ©2019 Emil Kaidesoja & Elmeri Kinnunen
          </Text>
        </View>
      </View>
    );
  }
}

export default Info;
