import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './views/Home';
import ProductInfo from './views/ProductInfo';
import NewProduct from './views/NewProduct';
import Edit from './views/Edit';
import Signin from './views/Signin';

const { Navigator, Screen } = createStackNavigator();

// Navegação principal do aplicativo.
// Relativa às headers do aplicativo.
export default function App() {

  return (
    <NavigationContainer>
      {/* Se precisar editar uma página em específico coloque ela como
      primeira opção na lista abaixo, ela vai aparecer no app como sendo a home */}
      <Navigator>
        <Screen name="sigin" component={ Signin } options={{
          title: "Loja do Sebastião"
        }}/>
        <Screen name="home" component={ Home } options={{
          title: "Loja do Sebastião", 
          headerLeft: "",
        }}/>
        <Screen name="info" component={ ProductInfo } options={{
          title: "Informações do Produto"
        }}/>
        <Screen name="edit" component={ Edit } options={{
          title: "Editar Produto"
        }}/>
        <Screen name="new" component={ NewProduct } options={{
          title: "Novo Produto"
        }}/>
      </Navigator>
    </NavigationContainer>
  );
}