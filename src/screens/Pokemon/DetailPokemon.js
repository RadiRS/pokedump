import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImageBackground } from 'react-native';
import { Container, Content, Text, View, Thumbnail } from 'native-base';
import { getPokemon } from '../../stores/actions';
import { Fonts, Colors } from '../../themes';
import ButtonIcon from '../../components/common/button/ButtonIcon';

const backgroundImg = require('../../assets/img/splashback.jpg');

class DetailPokemon extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerLeft: (
        <ButtonIcon
          onPress={() => navigation.goBack()}
          transparent={true}
          iconName="arrow-left"
        />
      )
    };
  };

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

  handlePressEdit = item => {
    this.props.navigation.navigate('UpdatePokemon', { item });
  };

  handlePressMap = () => {
    this.props.navigation.navigate('Map');
  };

  render() {
    const { item } = this.props.navigation.state.params;
    let { name, image_url, category, types } = this.state;

    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <ImageBackground
            blurRadius={10}
            square
            style={{
              flex: 1,
              height: 400,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            source={backgroundImg}
          >
            <Thumbnail
              style={styles.image}
              large
              square
              resizeMode="center"
              source={{ uri: image_url }}
            />
            <View
              style={{
                zIndex: 1,
                backgroundColor: Colors.primary,
                borderRadius: 20,
                flexDirection: 'row',
                position: 'absolute',
                top: 10,
                right: 10
              }}
            >
              <ButtonIcon
                transparent
                iconName="map"
                onPress={() => this.handlePressMap()}
              />
              <ButtonIcon
                transparent
                iconName="pencil"
                onPress={() => this.handlePressEdit(item)}
              />
            </View>
          </ImageBackground>
          <View
            style={{
              flex: 1.2,
              width: '100%',
              backgroundColor: Colors.secondary,
              alignItems: 'center'
            }}
          >
            <Text style={styles.name}>{name.toUpperCase()}</Text>
            <View
              style={{
                width: '80%',
                borderWidth: 2,
                borderRadius: 5,
                padding: 5,
                marginTop: 5,
                borderColor: Colors.darkSeaGreen,
                backgroundColor: Colors.lightGreen
              }}
            />

            <View
              style={{
                width: '80%',
                borderWidth: 2,
                borderRadius: 5,
                padding: 5,
                marginTop: 15,
                borderColor: Colors.textGrey,
                backgroundColor: Colors.textButton,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 30, color: Colors.textGrey }}>
                {category.name}
              </Text>
              <Text style={{ color: Colors.textGrey }}>Category</Text>
            </View>

            <View
              style={{
                width: '80%',
                borderWidth: 2,
                borderRadius: 5,
                padding: 5,
                marginTop: 15,
                borderColor: Colors.textGrey,
                backgroundColor: Colors.textButton,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {types.map(type => (
                  <Text
                    key={type.id}
                    style={{
                      color: Colors.textButton,
                      width: 150,
                      margin: 5,
                      textAlign: 'center',
                      fontSize: 30,
                      padding: 10,
                      backgroundColor: Colors.primary,
                      borderColor: Colors.primary,
                      borderRadius: 10,
                      borderWidth: 1
                    }}
                  >
                    {type.name}
                  </Text>
                ))}
              </View>
              <Text style={{ color: Colors.textGrey }}>Types</Text>
            </View>
          </View>

          {/* <Thumbnail
            blurRadius={10}
            square
            style={{ height: 350, width: '100%', position: 'absolute', top: 0 }}
            source={backgroundImg}
          />
          <Thumbnail
            style={styles.image}
            large
            square
            resizeMode="center"
            source={{ uri: image_url }}
          />
          <Text style={styles.name}>{name}</Text>
          <View style={styles.containerInfo}>
            <View
              style={{
                zIndex: 1,
                backgroundColor: Colors.freesio,
                borderRadius: 20,
                flexDirection: 'row',
                position: 'absolute',
                top: 10,
                right: 10
              }}
            >
              <ButtonIcon
                transparent
                iconName="map"
                onPress={() => this.handlePressMap()}
              />
              <ButtonIcon
                transparent
                iconName="pencil"
                onPress={() => this.handlePressEdit(item)}
              />
            </View>
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
          </View> */}
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
    // flex: 1,
    height: 300,
    width: 300
  },
  name: {
    textAlign: 'center',
    color: Colors.textGrey,
    fontSize: 40
  },
  typesContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  typeText: {
    marginLeft: 5,
    color: Colors.beige,
    fontSize: Fonts.size.regular
  },
  containerInfo: {
    flex: 1,
    // justifyContent: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: Colors.success
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
