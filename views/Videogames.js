import React from 'react';
import CardList from './components/CardList';

export default function Videogames({ navigation }) {
    
    const product = {
        name: "Videogame", 
        price: 1200, 
        quantity: 5
    }

    const products = [
        product, 
        product, 
        product, 
        product, 
        product, 
        product, 
        product
    ]

    return (
        <CardList products={products} navigation={navigation} />
    )
}