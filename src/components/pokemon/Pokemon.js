import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Text, View, Thumbnail } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ButtonIcon from '../common/button/ButtonIcon';
import { Colors } from '../../themes';

class Pokemon extends Component {
  render() {
    const { onPress, data, pokemon, handleDelete, handleUpdate } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {data.image_url ? (
          <Thumbnail
            square
            large
            resizeMode="center"
            style={styles.ThumbnailPokemon}
            source={{ uri: data.image_url }}
          />
        ) : null}
        <Text style={styles.name}>{data.name}</Text>
        <View
          style={{
            width: '80%',
            borderWidth: 2,
            borderRadius: 5,
            padding: 5,
            marginTop: 2,
            borderColor: Colors.darkSeaGreen,
            backgroundColor: Colors.lightGreen
          }}
        />
        {/* <View style={styles.containerInfo}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.info}>
            <Text style={styles.textCategoryTitle}>Category & Types</Text>
            <Text style={styles.textCategory}>{data.category.name}</Text>
            <View style={styles.containerFooterPokemon}>
              <Text style={styles.textTypeTitle}>Type: </Text>
              {data.types.map(type => (
                <Text key={type.id} style={styles.textType}>
                  {type.name}
                </Text>
              ))}
            </View>
          </View>
        </View> */}
        {/* <ButtonIcon
          transparent
          style={{
            position: 'absolute',
            alignSelf: 'flex-end'
          }}
          iconName="trash"
          onPress={handleDelete}
        /> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    height: 200,
    borderRadius: 10
    // backgroundColor: Colors.success
  },
  containerInfo: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
    // back
  },
  info: {
    borderWidth: 2,
    padding: 10,
    width: '100%',
    backgroundColor: Colors.freesio,
    borderColor: Colors.yellow,
    borderRadius: 10
  },
  nameHeaderPokemon: {
    color: '#8E9A90'
  },
  name: {
    // flex: 0.7,
    fontSize: 27,
    alignSelf: 'center',
    color: Colors.textGrey,
    width: '80%',
    textAlign: 'center',
    borderBottomWidth: 5,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderBottomColor: Colors.textGrey
    // fontFamily: 'Marat Sans DemiBold'
  },
  textCategoryTitle: {
    color: Colors.textButton
  },
  textCategory: {
    color: Colors.textButton
  },
  ThumbnailPokemon: {
    // flex: 0.4,
    width: 100,
    height: 100
  },
  containerFooterPokemon: {
    flexDirection: 'row'
    // justifyContent: 'space-between'
  },
  textTypeTitle: {
    color: Colors.textButton
  },
  textType: {
    color: Colors.textButton,
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
