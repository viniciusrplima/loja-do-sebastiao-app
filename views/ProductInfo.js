import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import database from '../services/database';

export default function ProductInfo({ navigation, route }) {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(product.quantity);

    useEffect(() => {
        product.quantity = quantity;
        database.updateProduct(product._id, { quantity })
            .catch(err => console.log(err));
    }, [quantity]);

    const handleEdit = () => {
        navigation.navigate('edit', { product });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <MaterialIcon name="edit" color={'white'} size={26} />
            </TouchableOpacity>
            <Image style={styles.image} source={{ uri: product.photoURL }} />
            <View style={styles.info}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>R$ {product.price}</Text>
                <View style={styles.quantitySet}>
                    <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity - 1)}>
                        <Icon name="minus" size={26} color={'white'} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}> {quantity} items</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity + 1)}>
                        <Icon name="plus" size={26} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    image: {
        flex: 1,
        borderRadius: 5,
        height: 200,
        width: 250,
    },
    info: {
        marginTop: 20,
        flex: 1,
    },
    title: {
        fontSize: 28,
        color: '#333'
    },
    price: {
        fontSize: 20,
        color: '#666'
    },
    quantitySet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30
    },
    quantity: {
        fontSize: 22,
        color: '#999',
        fontWeight: 'bold',
        width: 150,
        textAlign: 'center'
    },
    button: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#698',
        borderRadius: 25,
        shadowColor: '#333',
        elevation: 5
    },
    editButton: {
        backgroundColor: '#66e',
        borderRadius: 25,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginBottom: -25,
        zIndex: 1,
        shadowColor: '#333',
        elevation: 5
    },
})