import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, View, Thumbnail } from 'native-base';
import { getPokemon } from '../../stores/actions';
import { Fonts, Colors } from '../../themes';

class DetailPokemon extends Component {
  state = {
    name: '',
    image_url: 'img',
    category: {},
    types: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.pokemon) {
      this.setState({ ...nextProps.pokemon });
    }
  }

  componentDidMount() {
    const { item } = this.props.navigation.state.params;
    this.props.getPokemon(item);
  }

  render() {
    let { name, image_url, category, types } = this.state;

    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <Thumbnail
            style={styles.image}
            large
            square
            resizeMode="center"
            source={{ uri: image_url }}
          />
          <Text style={styles.name}>{name}</Text>
          <View style={styles.containerInfo}>
            <Text style={styles.typeText}>Info</Text>
            <Text style={styles.typeText}>Category : {category.name}</Text>
            <View style={styles.typesContainer}>
              <Text style={styles.typeText}>Types :</Text>
              {types.map(type => (
                <Text key={type.id} style={styles.typeText}>
                  {type.name}
                </Text>
              ))}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    height: 200,
    width: 200
  },
  name: {
    fontSize: 50
  },
  typesContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  typeText: {
    marginLeft: 5,
    fontSize: Fonts.size.regular
  },
  containerInfo: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    margin: 10,
    width: '100%',
    borderWidth: 2,
    backgroundColor: Colors.darkSeaGreen,
    borderColor: '#f8f8f8',
    borderRadius: 10
  }
};

const mapStateToProps = ({ pokemon }) => ({
  pokemon: pokemon.result
});

const mapDispatchToProps = { getPokemon };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPokemon);
