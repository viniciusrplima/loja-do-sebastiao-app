import React from 'react';
import { BottomNavigation} from 'react-native-paper';

import Tvs from './Tvs';
import Eletros from './Eletros';
import Videogames from './Videogames';
import Celulares from './Celulares';


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
    tvs: () => (<Tvs navigation={this.props.navigation} route={this.props.route}/>),
    eletros: () => (<Eletros navigation={this.props.navigation} route={this.props.route}/>),
    videogames: () => (<Videogames navigation={this.props.navigation} route={this.props.route}/>),
    celulares: () => (<Celulares navigation={this.props.navigation} route={this.props.route}/>),
  });

  componentDidCatch(error, errorInfo) {
    // Componente para erro no UI, favor não mexer kkkkk. Zueira pode mexer, só vai ficar dando um erro amarelinho.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}