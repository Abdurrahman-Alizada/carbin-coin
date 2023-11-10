import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
const BankTransferIndex = () => {
  const theme = useTheme()
  return (
    <View style={{flex:1,backgroundColor:theme.colors.background, alignItems:"center",justifyContent:"center"}}>
      <Text>BankTransferIndex</Text>
    </View>
  )
}

export default BankTransferIndex

const styles = StyleSheet.create({})