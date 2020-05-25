import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from './components/Card';
import database from '../services/database';
import { ActivityIndicator } from 'react-native-paper';


export default function CardList({ navigation, category, loadingColor }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Força a atualização da página sempre que aparecer na tela
    useEffect(() => {
        navigation.addListener('focus', e => {
	    loadProducts();
	})
    }, []);

    const loadProducts = async() => {
        setLoading(true);
        await database.getProducts(category)
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
        setLoading(false);
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
            <ActivityIndicator animating={loading} size='large' color={loadingColor} />

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
