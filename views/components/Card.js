import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

export default function Card({ product, navigation, onPress }) {

  const cardColor = selectCardColor(product.quantity);

  function selectCardColor(quantity) {
    if (quantity === 0) {
      return 'red';
    }
    if (quantity < 10) {
      return '#ffee58';
    }

    return 'white';
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.image} source={{ uri: product.photoURL }} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>R$ {product.price}</Text>
        <Text style={styles.quantity}>{product.quantity} items</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    height: 100,
    marginBottom: 20,
    shadowColor: '#333',
    elevation: 3,
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 90,
    height: 70
  },
  info: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 5
  },
  price: {
    marginLeft: 15,
    color: '#999'
  },
  quantity: {
    marginLeft: 15,
    color: '#999'
  }
})