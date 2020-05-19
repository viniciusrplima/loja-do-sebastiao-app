import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import database from '../services/database';

export default function Signin({ navigation }) {

    const handlePress = () => {
        database.signIn()
        .then(accessPermission => {
            if(accessPermission) {
                navigation.navigate('home');
            }
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={ handlePress }>
                <Text style={styles.title}>Fazer Login pelo Google</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    button: {
        backgroundColor: '#55f',
        paddingHorizontal: 25, 
        paddingVertical: 15, 
        borderRadius: 3, 
        shadowColor: '#333', 
        elevation: 5
    },
    title: {
        color: 'white', 
        fontSize: 18, 
        textTransform: 'uppercase'
    }
})