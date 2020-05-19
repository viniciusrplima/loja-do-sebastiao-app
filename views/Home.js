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
      { key: 'tvs', title: 'Televisões', color: '#bf360c', icon: 'desktop-mac' },
      { key: 'eletros', title: 'Eletrodomésticos', color: '#4e342e', icon: 'radio' },
      { key: 'videogames', title: 'Videgames', color: '#2e7d32', icon: 'gamepad' },
      { key: 'celulares', title: 'Celulares', color: '#01579b',  icon: 'cellphone' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    tvs: () => (<CardList category={'tv'} navigation={this.props.navigation} route={this.props.route}/>),
    eletros: () => (<CardList category={'eletrodomestico'} navigation={this.props.navigation} route={this.props.route}/>),
    videogames: () => (<CardList category={'videogame'} navigation={this.props.navigation} route={this.props.route}/>),
    celulares: () => (<CardList category={'celular'} navigation={this.props.navigation} route={this.props.route}/>),
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