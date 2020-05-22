import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './components/Card';
import database from '../services/database';

export default function CardList({ navigation, category }) {

    const [products, setProducts] = useState([]);

    // Força a atualização da página sempre que aparecer na tela
    useEffect(() => {
        navigation.addListener(
            'focus',
            payload => {
                console.log("render");
                loadProducts();
            }
        );
    }, []);

    const loadProducts = () => {
        database.getProducts(category)
        .then(({ data }) => {
            data.sort((a, b) => {
                if(a.quantity < b.quantity) return 1;
                else return -1;
            })
            setProducts(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        navigation={navigation}
                        onPress={() => {
                            navigation.navigate('info', { product })
                        }}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('new', {category} ) }}>
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
