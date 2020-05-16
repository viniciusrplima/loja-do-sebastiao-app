import React from 'react';
import CardList from './components/CardList';

export default function Tvs({ navigation }) {
    
    const product = {
        name: "Televisão", 
        price: 600, 
        quantity: 15
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