import React from 'react';
import CardList from './components/CardList';

export default function Eletros({ navigation }) {
    
    const product = {
        name: "Eletrodoméstico", 
        price: 800, 
        quantity: 80
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