import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Text, View, Thumbnail } from 'native-base';
// Themes
import { Colors } from '../../themes';
// Components
import ButtonLabel from '../common/button/ButtonLabel';

export class PickImage extends Component {
  state = {
    pickImaged: null
  };

  handleImagePicker = () => {
    ImagePicker.showImagePicker({ Title: 'Pick an image' }, res => {
      if (res.didCancel) {
        console.warn('User cancell');
      } else if (res.error) {
        console.warn('Error', res.error);
      } else {
        this.setState({ uri: res.uri });
        this.props.handleImagePick(res);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.uri ? (
          <Thumbnail
            resizeMode="center"
            style={{
              flex: 0.8,
              padding: 0,
              margin: 0,
              width: '100%',
              height: 100
            }}
            source={{ uri: this.state.uri }}
          />
        ) : (
          <Text> No Image </Text>
        )}

        <ButtonLabel
          style={{
            marginTop: 20,
            alignSelf: 'center',
            backgroundColor: Colors.darkBlue,
            borderRadius: 10
          }}
          onPress={this.handleImagePicker}
          label="Select Image"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.beige,
    borderRadius: 10
  }
});

export default PickImage;
