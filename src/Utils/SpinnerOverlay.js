import React from "react"
import { View, ActivityIndicator } from "react-native"
import styles from "../css/styles"

function spinnerOverlay() {
    return (
        <View className={styles.loader}>
            <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: "60%" }}
            />
        </View>
    )
}

export default spinnerOverlay