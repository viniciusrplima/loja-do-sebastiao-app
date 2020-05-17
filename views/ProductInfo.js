import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';


export default function ProductInfo({ navigation, route }) {

    const { product } = route.params;

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: product.photoURL }} />
            <View style={styles.info}>
                <Text>{product.name}</Text>
                <Text>{product.price}</Text>
                <Text>{product.quantity}</Text>
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
        height: 200, 
        width: 200, 
        borderRadius: 15
    }, 
    info: {
        marginTop: 20,
        flex: 1,
    }
})