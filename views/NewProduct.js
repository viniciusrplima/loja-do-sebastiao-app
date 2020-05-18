import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Form } from '@unform/mobile';
import Input from './components/Input';
import * as ImagePicker from 'expo-image-picker';


export default function NewProduct({ route, navigation }) {

    const formRef = useRef(null);

    const [image, setImage] = useState([]);
    

    // Aqui será feita a submit para a api e o redirecionamento
    function handleSubmit(data) {


        // Aqui há uma gambiarra, pois eu não conseguir fazer com que a categoria fosse pelo input
        // Será corrigida no próximo commit
        data.categoria = route.params.category;
        data.foto = image;

        // dados que vão para api
        console.log(data);
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
                <Input name="valor" type="number" label='Valor do produto' style={styles.textInput} />


                <Avatar.Icon size={40} icon="asterisk" style={styles.avatar} />
                <Input name="quantidade" type="number" label='Quantidade inicial' style={styles.textInput} />

                <Button icon="camera" mode="Text " onPress={pickImage} style={styles.foto}>
                    Enviar Foto
              </Button>
                <Button mode="contained" onPress={() => formRef.current.submitForm()} style={styles.salvar}>
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