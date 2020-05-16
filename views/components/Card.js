import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Card({ product, navigation }) {

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('edit')}>
            <Text>{product.name}</Text>
            <Text>R$ {product.price}</Text>
            <Text>{product.quantity} items</Text>
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
        borderRadius: 5
    }
})