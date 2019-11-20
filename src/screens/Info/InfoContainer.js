import React, { Component } from "react";
import { Text, View, Button, ScrollView, TouchableHighlight, TouchableOpacity, FlatList } from "react-native";
import styles from "../../css/styles";
import { Header } from "react-native-elements";

class Info extends Component {

  constructor(){
    super();
    this.state ={
      status:false
    }
  }
 
ShowHideTextComponentView = () =>{
 
  if(this.state.status == true)
  {
    this.setState({status: false})
  }
    else
    {
      this.setState({status: true})
    }
}
 

  render() {
    return (
      <View className={styles.infoContainer}>
        <View className={styles.infoHeader}>
          <Text className={styles.infoHeaderText}>
            Information about our application.
          </Text>
        </View>
        <View className={styles.infoUpper}>
          <TouchableOpacity 
          onPress={this.ShowHideTextComponentView}>
            <Text style={styles.toggleList}>Supported items</Text>

            </TouchableOpacity>
                <View style={styles.list}>
                  {
                    this.state.status ? 
                    <FlatList data={[
                      {key: "Camera"},
                      {key: "Cat"},
                      {key: "Chair"},
                      {key: "Cup"},
                      {key: "Dog"},
                      {key: "Laptop"},
                      {key: "Pizza"},
                      {key: "Plant"},
                      {key: "Scissors"},
                      {key: "Whatch"},
                    ]}
                    renderItem={({item}) => <Text style={styles.listItems}>{item.key}</Text>}
                    /> : null
                  }
                  </View>
          <Text style={styles.smallHeader}>This application have made with a React Native and Python</Text>
          <Text className={styles.infoUpperText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.
          </Text>
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
