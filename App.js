import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from './services/database';

import Home from './views/Home';
import ProductInfo from './views/ProductInfo';
import NewProduct from './views/NewProduct';
import Edit from './views/Edit';
import Loading from './views/Loading';

const { Navigator, Screen } = createStackNavigator();

// Navegação principal do aplicativo.
// Relativa às headers do aplicativo.
export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    database.signIn()
    .then((access) => {
      if(access) {
        setIsLoading(false);
      }
    })
  }, []);

  return (
    isLoading ? <Loading />
    : 
    <NavigationContainer>
      {/* Se precisar editar uma página em específico coloque ela como
      primeira opção na lista abaixo, ela vai aparecer no app como sendo a home */}
      <Navigator>
        <Screen name="home" component={ Home } options={{
          title: "Loja do Sebastião", 
          headerLeft: "", 
          headerRight: () => (
            <TouchableOpacity onPress={() => {
              database.logOut();
            }}>
              <Icon name="exit-to-app" size={28} style={{paddingRight: 15}}/>
            </TouchableOpacity>
          )
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