import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Form } from '@unform/mobile';
import Input from './components/Input';
import * as ImagePicker from 'expo-image-picker';
import database from '../services/database';


export default function Edit({ route, navigation }) {
    const formRef = useRef(null);

    const [image, setImage] = useState(null);

    const product = {
        id: route.params.product._id,
        category: route.params.product.category,
        name: route.params.product.name,
        price: route.params.product.price.toString(),
        quantity: route.params.product.quantity.toString()
    }

    let color;

    function validateData(data) {
        const errors = [];
        if (data.name.length === 0) {
            errors.push('Nome inválido')
        }

        if (data.price <= 0) {
            errors.push('Valor inválido')
        }

        if (data.quantity <= 0 || data.quantity % 1 !== 0) {
            errors.push('Quantidade inválida');
        }

        return errors;
    }

    function handleSubmit(data) {

        const errors = validateData(data);

        if (errors.length !== 0) {
            Alert.alert('Não foi possível cadastrar o produto', errors[0]);
        } else {

            if (image) {
                data.file = image;
            }
            database.updateProduct(product.id, data)
                .then(result => {
                    if (image) {
                        database.updateImage(result.data._id, data.file)
                            .then(console.log)
                            .catch(console.log);
                    }
                })
                .catch(error => {
                    Alert.alert('Erro', `Não foi possível editar o produto. ${error}`)
                });
        }
    }

    async function pickImage() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result.uri)
            }

            setImage(result);
        } catch (E) {
            console.log(E);
        }
    }

    if (route.params.product.category === 'tv') {
        color = '#bf360c';
    } else if (route.params.product.category === 'eletrodomestico') {
        color = '#4e342e';
    } else if (route.params.product.category === 'videogame') {
        color = '#2e7d32';
    } else {
        color = '#01579b';
    }

    return (
        <View>
            <Form ref={formRef} onSubmit={handleSubmit} initialData={product}>

                <Avatar.Icon size={40} icon="cart" color={color} style={styles.avatar} />
                <Input
                    name="name"
                    type="text"
                    label='Nome do produto'
                    underlineColor={color}
                    style={styles.textInput}
                />


                <Avatar.Icon size={40} icon="cash" color={color} style={styles.avatar} />
                <Input
                    name="price"
                    type="number"
                    label='Valor do produto'
                    underlineColor={color}
                    value={product.valor}
                    style={styles.textInput}
                />


                <Avatar.Icon size={40} icon="asterisk" color={color} style={styles.avatar} />
                <Input
                    name="quantity"
                    type="number"
                    label='Quantidade inicial'
                    underlineColor={color}
                    style={styles.textInput}
                />

                <Button icon="camera" mode="Text " color={color} onPress={pickImage} style={styles.foto}>
                    Enviar Nova Foto
                </Button>
                <Button mode="contained" color={color} onPress={() => formRef.current.submitForm()} style={styles.foto}>
                    Editar produto
              </Button>

            </Form>
        </View>
    );
}


const styles = StyleSheet.create({
    textInput: {
        width: 260,
        left: 70,
        top: -30,
        marginBottom: -10
    },
    avatar: {
        top: 20,
        left: 20,
        backgroundColor: '#fff'
    },
    foto: {
        bottom: -10
    }

})
