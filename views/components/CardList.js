import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './Card';

export default function CardList({ navigation, products }) {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Icon name='plus' size={26} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        padding: 20, 
    },
    button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#000',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
    }
})
