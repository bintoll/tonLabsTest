import React, { Component } from 'react'
import { StatusBar, StyleSheet } from 'react-native'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { MainNavigation } from '@navigation/main'

interface Props {}
interface State {}

export class App extends Component<Props, State> {
  public render() {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.root}>
          <MainNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})
