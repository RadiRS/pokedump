import React, { Component } from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
  Callout
} from 'react-native-maps';
import { connect } from 'react-redux';
// Actions
import { getPokemon } from '../../stores/actions';
// Themes
import { Colors } from '../../themes';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapPokemonScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true
    };
  };

  handlePressCallout = item => {
    this.props.navigation.navigate('DetailPokemon', { item });
  };

  render() {
    const { pokemon } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: -6.587194,
            longitude: 106.778526,
            latitudeDelta: 0.115,
            longitudeDelta: 0.0121
          }}
        >
          {pokemon.data.map(pokemon => (
            <Marker
              key={pokemon.id}
              coordinate={{
                longitude: parseFloat(pokemon.latitude),
                latitude: parseFloat(pokemon.longitude)
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: 'http://pngimg.com/uploads/pokeball/pokeball_PNG21.png'
                }}
              />
              <Callout
                onPress={() => this.handlePressCallout(pokemon)}
                style={{
                  width: 110,
                  backgroundColor: Colors.darkSeaGreen,
                  borderRadius: 30
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5
                  }}
                >
                  <Text>{pokemon.name}</Text>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: pokemon.image_url }}
                  />
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
};

const mapStateToProps = ({ pokemon }) => ({
  pokemon: pokemon.data
});

const mapDispatchToProps = {
  getPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPokemonScreen);
