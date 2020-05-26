import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import database from '../services/database';

const image = { uri: 'https://loja-do-sebastiao.herokuapp.com/assets/img/background3.png' };

export default function Signin({ navigation }) {

    const handlePress = () => {
        database.signIn()
            .then(accessPermission => {
                if (accessPermission) {
                    navigation.navigate('home');
                }
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.title}>Controle seu estoque!</Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.titleButton}>Fazer Login pelo Google</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    button: {
        backgroundColor: '#C62828',
        paddingHorizontal: 25, 
        paddingVertical: 15,
        borderRadius: 3,
        shadowColor: '#333',
        elevation: 5,
    },
    titleButton: {
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    title: {
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontSize: 45,
        width:250,
        height:160,
        textTransform: 'uppercase',
        textAlign:'center',
        bottom:50,

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
      }
})