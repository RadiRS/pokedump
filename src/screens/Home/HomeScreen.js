import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, FlatList, Modal, TouchableHighlight } from 'react-native';
import {
  Icon,
  View,
  Text,
  Container,
  Fab,
  Header,
  Item,
  Button,
  Input,
  Left
} from 'native-base';
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

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const setModalVisible = navigation.getParam('setModalVisible');
    return {
      title: 'POKEMON',
      headerStyle: {
        backgroundColor: Colors.primary,
        elevation: null
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
            onPress={() => setModalVisible(true)}
            transparent={true}
            iconName="search"
          />
        </>
      )
    };
  };

  state = {
    modalVisible: false,
    data: [],
    isLoading: true
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.pokemon.data) {
      this.setState({ data: nextProps.pokemon.data });
    }
  }

  componentDidMount() {
    this.props.getPokemons();
    this.props.authenticatedUser();
    this.props.navigation.setParams({
      setModalVisible: this.setModalVisible
    });
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  handleGetPokemon = item => {
    this.props.navigation.navigate('DetailPokemon', { item });
    this.setModalVisible(false);
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

  handleSearchPokemon = query => {
    this.props.getPokemons(query);
    this.setState({ data: this.props.pokemon.data });
  };

  keyExtractor = item => item.toString();

  renderItem = ({ item }) => (
    <Pokemon
      data={item}
      onPress={() => this.handleGetPokemon(item)}
      handleDelete={() => this.handleDeletePokemon(item)}
    />
  );

  render() {
    // const { data, isLoading } = this.props.pokemon;
    const { isLoading } = this.props.pokemon;
    const { data } = this.state;
    StatusBar.setBackgroundColor(Colors.primary);

    return (
      <Container style={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            numColumns={2}
            data={data.data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            refreshing={isLoading}
            onRefresh={() => this.handleRefresh()}
          />
        )}
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.primary }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('AddPokemon')}
        >
          <Icon name="plus" type="FontAwesome" />
        </Fab>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View>
            <View>
              <Header
                style={{ backgroundColor: Colors.primary }}
                searchBar
                rounded
              >
                <Left
                  style={{
                    flex: 0.1
                  }}
                >
                  <ButtonIcon
                    style={{ alignSelf: 'center' }}
                    transparent
                    iconName="times"
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  />
                </Left>
                <Item>
                  <Icon name="ios-search" />
                  <Input
                    placeholder="Search"
                    onChangeText={value => this.handleSearchPokemon(value)}
                  />
                </Item>
              </Header>

              <FlatList
                numColumns={2}
                data={data.data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                refreshing={isLoading}
                onRefresh={() => this.handleRefresh()}
              />
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: Colors.secondary,
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
