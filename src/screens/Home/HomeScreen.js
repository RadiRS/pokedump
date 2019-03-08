import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, FlatList } from 'react-native';
import { Icon, View, Text, Container, Fab } from 'native-base';
import { DrawerActions } from 'react-navigation';
// Actions
import {
  getPokemons,
  authenticatedUser,
  deletePokemon
} from '../../stores/actions';
// Components
import ButtonIcon from '../../components/common/button/ButtonIcon';
import Pokemon from '../../components/pokemon/Pokemon';
import Spinner from '../../components/common/spinner/Spinner';
// Style
import { Colors } from '../../themes';

StatusBar.setHidden(false);

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: Colors.tintColor,
      headerLeft: (
        <ButtonIcon
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          transparent={true}
          iconName="bars"
        />
      ),
      headerRight: (
        <>
          <ButtonIcon
            onPress={() => alert('Tes')}
            transparent={true}
            iconName="bell"
          />
          <ButtonIcon
            onPress={() => alert('Tes')}
            transparent={true}
            iconName="search"
          />
        </>
      )
    };
  };

  componentDidMount() {
    this.props.getPokemons();
    this.props.authenticatedUser();
  }

  handleGetPokemon = item => {
    this.props.navigation.navigate('DetailPokemon', { item });
  };

  handleDeletePokemon = item => {
    this.props.deletePokemon(item);
  };

  handleUpdatePokemon = item => {
    this.props.navigation.navigate('UpdatePokemon', { item });
  };

  handleRefresh = () => {
    this.props.getPokemons();
  };

  keyExtractor = item => item.toString();

  renderItem = ({ item }) => (
    <Pokemon
      data={item}
      onPress={() => this.handleGetPokemon(item)}
      handleDelete={() => this.handleDeletePokemon(item)}
      // handleUpdate={() => this.handleUpdatePost(item)}
    />
  );

  render() {
    const { data, isLoading } = this.props.pokemon;

    return (
      <Container style={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            data={data.data.sort()}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            refreshing={isLoading}
            onRefresh={() => this.handleRefresh()}
          />
        )}
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.yellow }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('AddPokemon')}
        >
          <Icon name="plus" type="FontAwesome" />
        </Fab>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: Colors.beige,
    paddingTop: 10
  }
};

const mapStateToProps = ({ pokemon }) => ({
  pokemon
});

const mapDispatchToProps = {
  getPokemons,
  authenticatedUser,
  deletePokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
