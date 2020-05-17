import React, { useState, useEffect } from 'react';
import CardList from './components/CardList';
import database from '../services/database';

export default function Tvs({ navigation }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        database.getProducts('tv')
        .then(({ data }) => {
            setProducts(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <CardList products={products} navigation={navigation} />
    )
}