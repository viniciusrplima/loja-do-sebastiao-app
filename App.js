import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home';
import ProductInfo from './views/ProductInfo';
import NewProduct from './views/NewProduct';
import Edit from './views/Edit';

const { Navigator, Screen } = createStackNavigator();

// Navegação principal do aplicativo.
// Relativa às headers do aplicativo.
export default function App() {
  return (
    <NavigationContainer>
      {/* Se precisar editar uma página em específico coloque ela como
      primeira opção na lista abaixo, ela vai aparecer no app como sendo a home */}
      <Navigator>
        <Screen name="home" component={ Home } options={{
          title: "Loja do Sebastião", 
          headerRight: () => (<Text>logout</Text>)
        }}/>
        <Screen name="info" component={ ProductInfo } />
        <Screen name="edit" component={ Edit } />
        <Screen name="new" component={ NewProduct } />
      </Navigator>
    </NavigationContainer>
  );
}
