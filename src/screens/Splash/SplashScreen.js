import React, { Component } from 'react';
import { StatusBar, ActivityIndicator, ImageBackground } from 'react-native';
import { Container, Content, Thumbnail } from 'native-base';

// StatusBar.setHidden(true);

const logo = require('../../assets/img/labelicon.png');
const backgroundImg = require('../../assets/img/splashback2.jpg');

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 2000);
  }

  render() {
    return (
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        blurRadius={2}
        style={{ width: '100%', height: '100%', opacity: 100 }}
      >
        <StatusBar hidden />
        <Content contentContainerStyle={styles.container}>
          <Thumbnail
            source={logo}
            resizeMode="center"
            large
            style={{ width: '100%' }}
          />
        </Content>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default SplashScreen;
