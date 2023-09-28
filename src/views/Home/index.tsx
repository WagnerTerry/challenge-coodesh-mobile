import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { styles } from './styles'

export const Home = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
      </View>
    </SafeAreaView>
  )
}
