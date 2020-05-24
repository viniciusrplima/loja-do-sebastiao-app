import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Avatar, Button, ActivityIndicator } from 'react-native-paper';
import { Form } from '@unform/mobile';
import Input from './components/Input';
import * as ImagePicker from 'expo-image-picker';
import database from '../services/database';

export default function NewProduct({ route, navigation }) {

    const formRef = useRef(null);

    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);


    let color;

    function validateData(data) {
        const errors = [];
        if (data.name.length === 0) {
            errors.push('Nome inválido')
        }

        if (parseInt(data.price) <= 0) {
            errors.push('Valor inválido')
        }

        if (parseInt(data.quantity) <= 0 || parseInt(data.quantity) % 1 !== 0) {
            errors.push('Quantidade inválida');
        }

        return errors;
    }

    async function handleSubmit(data) {

        const errors = validateData(data);
        console.log(errors);
        data.price = parseInt(data.price);
        data.quantity = parseInt(data.quantity);


        if (errors.length !== 0) {
            Alert.alert('Não foi possível cadastrar o produto', errors[0]);
        } else {
            // Aqui há uma gambiarra, pois eu não conseguir fazer com que a categoria fosse pelo input
            // Será corrigida no próximo commit
            data.category = route.params.category;
            if (image) {
                data.file = image;
            }
          
            setLoading(true)
            await database.createProduct(data)
            .then( async (result) => {
                await database.updateImage(result.data._id, image)
                .then(console.log)
                .catch(console.log);
            })
            .catch(error => {
                console.log("Erro ao salvar produto: ");
                console.log(error);
            });
            navigation.navigate('home')
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

    if (route.params.category === 'tv') {
        console.log(route);
        color = '#bf360c';
    } else if (route.params.category === 'eletrodomestico') {
        console.log(route);

        color = '#4e342e';
    } else if (route.params.category === 'videogame') {
        console.log(route);

        color = '#2e7d32';
    } else {
        color = '#01579b';
    }

    return (
        <ScrollView>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Avatar.Icon size={40} icon="circle" color={color} style={styles.avatar} />
                <Input name="category" type="text" label="Categoria" underlineColor={color} value={route.params.category} disabled={true} style={styles.textInput} />

                <Avatar.Icon size={40} icon="cart" color={color} style={styles.avatar} /> 
                <Input name="name" type="text" label='Nome do produto' underlineColor={color} style={styles.textInput} />


                <Avatar.Icon size={40} icon="cash" color={color} style={styles.avatar} />
                <Input name="price" type="number" label='Valor do produto'underlineColor={color} style={styles.textInput} />


                <Avatar.Icon size={40} icon="asterisk" color={color} style={styles.avatar} />
                <Input name="quantity" type="number" label='Quantidade inicial' underlineColor={color} style={styles.textInput} />

                <Button icon="camera" mode="Text " color={color} onPress={pickImage} style={styles.foto}>
                    Enviar Foto
              </Button>
                <Button mode="contained" loading={loading} color={color} onPress={() => formRef.current.submitForm()}>
                    Salvar Produto
              </Button>
            </Form>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    textInput: {
        width: 260,
        left: 70,
        top: -30,
    },
    avatar: {
        top: 20,
        left: 20,
        backgroundColor:'#fff'
    },
    foto: {
        top: -20
    }

})
