import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Tvs from './Tvs';
import Eletros from './Eletros';
import Videogames from './Videogames';
import Celulares from './Celulares';

const { Navigator, Screen } = createBottomTabNavigator();

function Whatever({ route, navigation }) {

  return (
    <Provider>

      <View>
        <Text>{route.name}</Text>
        {/* Botão para testar se a biblioteca funciona */}
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      </View>
    </Provider>

  )
}

// Navegação secundária do aplicativo.
// Acessível apenas na home, utilizada para navegar entre as 
// categorias dos produtos.
export default function Home({ navigation }) {

  return (
    <Navigator tabBarOptions={{ style:{ height:50, paddingBottom: 0 } }}>
      <Screen name="tvs" component={ Tvs } options={{
        tabBarLabel: "Televisões",
        tabBarIcon: ({ color }) => <Icon name="desktop-mac" size={26} color={color}/>
      }}/>
      <Screen name="eletros" component={ Eletros } options={{
        tabBarLabel: "Eletrodomésticos",
        tabBarIcon: ({ color }) => <Icon name="radio" size={26} color={color}/>
      }}/>
      <Screen name="videogames" component={ Videogames } options={{
        tabBarLabel: "Videgames",
        tabBarIcon: ({ color }) => <Icon name="gamepad" size={26} color={color}/>
      }}/>
      <Screen name="celulares" component={ Celulares } options={{
        tabBarLabel: "Celulares",
        tabBarIcon: ({ color }) => <Icon name="cellphone" size={26} color={color} />
      }} />
    </Navigator>
  );
}
