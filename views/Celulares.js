import React from 'react';
import CardList from './components/CardList';

export default function Celulares({ navigation }) {
    
    const product = {
        name: "Celular", 
        price: 2400, 
        quantity: 30
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