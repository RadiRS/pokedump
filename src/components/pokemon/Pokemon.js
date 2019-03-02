import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Text, View, Thumbnail } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ButtonIcon from '../common/button/ButtonIcon';

class Pokemon extends Component {
  render() {
    const { onPress, data, pokemon, handleDelete, handleUpdate } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.containerInfo}>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.info}>
            <Text style={styles.author}>Category & Types</Text>
            <Text style={styles.author}>{data.category.name}</Text>
            {/* <View style={styles.containerFooterPokemon}>
              <Text>Type: </Text>
              {data.types.map(type => (
                <Text key={type.id} style={styles.textFooterPokemon}>
                  {type.name}
                </Text>
              ))}
            </View> */}
          </View>
        </View>
        {data.image_url ? (
          <Thumbnail
            square
            large
            resizeMode="center"
            style={styles.ThumbnailPokemon}
            source={{ uri: data.image_url }}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#fff',
    padding: 20,
    height: 250,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#8E9A95'
  },
  containerInfo: {
    flex: 0.5
    // back
  },
  info: {
    borderWidth: 2,
    padding: 10,
    width: '100%',
    borderColor: '#f8f8f8',
    borderRadius: 10
  },
  titleHeaderPokemon: {
    color: '#8E9A90'
  },
  title: {
    flex: 0.7,
    fontSize: 27,
    fontFamily: 'Marat Sans DemiBold'
  },
  ThumbnailPokemon: {
    flex: 0.4,
    width: 200,
    height: 200
  },
  containerFooterPokemon: {
    flexDirection: 'row'
    // justifyContent: 'space-between'
  },
  textFooterPokemon: {
    color: '#8E9A95',
    marginLeft: 5
  }
});

const mapStateToProps = ({ pokemon }) => ({
  pokemon: pokemon.data
});

export default connect(
  mapStateToProps,
  null
)(Pokemon);
