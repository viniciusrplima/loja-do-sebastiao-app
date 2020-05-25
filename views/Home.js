import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '../services/database';

import CardList from './CardList';


// Navegação secundária do aplicativo.
// Acessível apenas na home, utilizada para navegar entre as 
// categorias dos produtos.


export default class Home extends React.Component {
  
  state = {
    index: 0,
    routes: [
      { key: 'tvs', title: 'Televisão', color: '#bf360c', icon: 'desktop-mac' },
      { key: 'eletros', title: 'Eletrodoméstico', color: '#4e342e', icon: 'radio' },
      { key: 'videogames', title: 'Videgame', color: '#2e7d32', icon: 'gamepad' },
      { key: 'celulares', title: 'Celular', color: '#01579b',  icon: 'cellphone' },
    ],
  };

  _handleIndexChange = index =>{
    this.setState({ index })
    this.props.navigation.card = index;
  };

  _renderScene = BottomNavigation.SceneMap({
    tvs: () => (<CardList category={'tv'} navigation={this.props.navigation} route={this.props.route} loadingColor={'#bf360c'}/>),
    eletros: () => (<CardList category={'eletrodomestico'} navigation={this.props.navigation} route={this.props.route} loadingColor={'#4e342e'}/>),
    videogames: () => (<CardList category={'videogame'} navigation={this.props.navigation} route={this.props.route} loadingColor={'#2e7d32'}/>),
    celulares: () => (<CardList category={'celular'} navigation={this.props.navigation} route={this.props.route} loadingColor={'#01579b'}/>),
  });

  componentDidCatch(error, errorInfo) {
    // Componente para erro no UI, favor não mexer kkkkk. Zueira pode mexer, só vai ficar dando um erro amarelinho.
    logErrorToMyService(error, errorInfo);
  }

  render() {

    const { navigation } = this.props;

    navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity onPress={async () => {
          await database.logOut();
          navigation.navigate('sigin');
        }}>
          <Icon name="exit-to-app" size={28} style={{paddingRight: 15}}/>
        </TouchableOpacity>
      )
    });

    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}