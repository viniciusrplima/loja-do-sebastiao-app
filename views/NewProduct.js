import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Form } from '@unform/mobile';
import Input from './components/Input';
import * as ImagePicker from 'expo-image-picker';

import database from '../services/database';

export default function NewProduct({ route, navigation }) {

    const formRef = useRef(null);

    const [image, setImage] = useState([]);


    function validateData(data) {
        const errors = [];
        if (data.nome.length === 0) {
            errors.push('Nome inválido')
        }

        if (data.valor <= 0) {
            errors.push('Valor inválido')
        }

        if (data.quantidade <= 0 || data.quantidade % 1 !== 0) {
            errors.push('Quantidade inválida');
        }

        return errors;
    }

    function handleSubmit(data) {

        const errors = validateData(data);

        if (errors.length !== 0) {
            Alert.alert('Não foi possível cadastrar o produto', errors[0]);
        } else {
            // Aqui há uma gambiarra, pois eu não conseguir fazer com que a categoria fosse pelo input
            // Será corrigida no próximo commit
            data.categoria = route.params.category;
            if (image) {
                data.foto = image;
            }

            console.log(data);
            database.createProduct(data)
                .then(() => console.log('Produto criado'))
                .catch((err) => console.log(err));
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

    return (
        <ScrollView>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Avatar.Icon size={40} icon="circle" style={styles.avatar} />
                <Input name="categoria" type="text" label="Categoria" value={route.params.category} disabled={true} style={styles.textInput} />

                <Avatar.Icon size={40} icon="cart" style={styles.avatar} />
                <Input name="nome" type="text" label='Nome do produto' style={styles.textInput} />


                <Avatar.Icon size={40} icon="cash" style={styles.avatar} />
                <Input
                    name="valor"
                    type="number"
                    label='Valor do produto'
                    style={styles.textInput}
                    keyboardType='numeric'
                />


                <Avatar.Icon size={40} icon="asterisk" style={styles.avatar} />
                <Input
                    name="quantidade"
                    type="number"
                    keyboardType='numeric'
                    label='Quantidade inicial'
                    style={styles.textInput}
                />

                <Button icon="camera" mode="Text " onPress={pickImage} style={styles.foto}>
                    Enviar Foto
                </Button>

                <Button mode="contained" onPress={() => formRef.current.submitForm()}>
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
        top: -35,
    },
    avatar: {
        top: 20,
        left: 20
    },
    foto: {
        top: -20
    }

})
