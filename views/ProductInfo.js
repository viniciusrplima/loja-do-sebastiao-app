import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Button, ActivityIndicator } from 'react-native-paper';


import database from '../services/database';

export default function ProductInfo({ navigation, route }) {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(product.quantity);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        product.quantity = quantity;
        database.updateProduct(product._id, { quantity })
            .catch(err => console.log(err));
    }, [quantity]);

    const handleEdit = () => {
        navigation.navigate('edit', { product });
    }
    async function deleteProduct() {
        setLoading(true)
        await database.deleteProduct(product._id)
        .catch(err => console.log(err));
        setLoading(false)
        navigation.navigate('home');
    }
    const clickDelete = () => {
        setVisible(true);
    }
    const dimissDelete = () => {
        setVisible(false);
    }

    return (
        <View style={styles.container}>

            <Modal
                visible={visible}
                animationType={'fade'}
                transparent={true}
            > 
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Tem certeza que deseja excluir?</Text>
                    <Button mode="contained" color="#e53935" style={styles.modalButton} onPress={deleteProduct}>Quero excluir</Button>
                    <Button mode="contained" color="#2e7d32" style={styles.modalButton} onPress={dimissDelete}>Não quero excluir</Button>
                    <ActivityIndicator animating={loading} color="red" />
                </View>
            </Modal>

	    <View style={styles.buttonSet}>
                <TouchableOpacity style={styles.deleteButton} onPress={clickDelete}>
                    <MaterialIcon name="delete" color={'white'} size={26} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <MaterialIcon name="edit" color={'white'} size={26} />
                </TouchableOpacity>
	    </View>
            <Image style={styles.image} source={{ uri: product.photoURL }} />
            <View style={styles.info}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>R$ {product.price}</Text>
                <View style={styles.quantitySet}>
                    <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity - 1)}>
                        <Icon name="minus" size={26} color={'white'} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}> {quantity} items</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setQuantity(quantity + 1)}>
                        <Icon name="plus" size={26} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        flex: 1,
        borderRadius: 5,
        height: 200,
        width: 250,
        alignItems: 'center',
    },
    info: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: '#333'
    },
    price: {
        fontSize: 20,
        color: '#666'
    },
    quantitySet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30
    },
    quantity: {
        fontSize: 22,
        color: '#999',
        fontWeight: 'bold',
        width: 150,
        textAlign: 'center'
    },
    button: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#698',
        borderRadius: 25,
        shadowColor: '#333',
    },
    modalButton: {
        width: 200,
        height: 45,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#333',
    },
    buttonSet: {
        flexDirection: 'row',
	width: 250, 
	justifyContent: 'flex-end', 
	marginBottom: -5,
	zIndex: 1
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        elevation: 1,
        shadowColor: '#333',
    },
    editButton: {
        backgroundColor: '#66e',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        elevation: 1,
        shadowColor: '#333',
    },
    modalContent: {
        flex: 1,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        top: 56,
        backgroundColor: "#000",
        opacity: 0.8,

    },
    modalText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        elevation: 6,
        height: 45,
        marginBottom: 20,
        fontSize: 20,
    }
})
