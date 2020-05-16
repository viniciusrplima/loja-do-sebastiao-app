import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import Card from './Card';

export default function CardList({ navigation, products }) {

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                { products.map((product, index) => (
                    <Card 
                        key={index} 
                        product={product} 
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})