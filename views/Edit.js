import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { TextInput, Avatar, List, Button  } from 'react-native-paper';

export default function Edit({ route, navigation }) {

    const { product } = route.params;

    return (
        <ScrollView>
            <Avatar.Icon size={40} icon="circle"  style={styles.avatar}/>
            <TextInput 
                label='Id do produto' 
                style={styles.textInput} 
                value={product._id} 
                disabled={true}
            />

            <Avatar.Icon size={40} icon="cart" style={styles.avatar}/>
            <TextInput label='Nome do produto' style={styles.textInput}></TextInput>

            <Avatar.Icon size={40} icon="cash" style={styles.avatar}/>
            <TextInput label='Valor do produto' style={styles.textInput}></TextInput>

            <Avatar.Icon size={40} icon="asterisk" style={styles.avatar}/>
            <TextInput label='Quantidade inicial' style={styles.textInput}></TextInput>

            <Avatar.Icon size={40} icon="equal-box" style={styles.avatar}/>

            <List.Section style={styles.textInput}>
                <List.Accordion title="Selecione a Categoria">
                    <List.Item title="Televisões" />
                    <List.Item title="Eletrodomésticos" />
                    <List.Item title="Videogames" />
                    <List.Item title="Celulares" />
                </List.Accordion>
            </List.Section>

            <Button icon="camera" mode="Text " onPress={() => console.log('Pressed')}  style={styles.foto}>
                Enviar Nova Foto
            </Button>
            <Button mode="contained" onPress={() => console.log('Pressed')}  style={styles.salvar}>
                Editar Produto
            </Button>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    textInput: {
        width: 260,
        left:70,
        top:-35,
    },
    avatar:{
        top:20,
        left:20
    },
    foto: {
     top:-30
    },
    salvar: {
        top:-20
    }
   
 })