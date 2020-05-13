import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Produtos da Loja</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  title: {
    textAlign: 'center', 
    fontSize: 24, 
    fontWeight: 'bold',
  }
});
