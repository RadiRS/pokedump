import React, { Component } from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { Container, Content, Thumbnail } from 'native-base';

StatusBar.setHidden(true);

const logo = require('../../assets/img/char-pikachu.png');

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 2000);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Thumbnail resizeMode="center" large source={logo} />
          <ActivityIndicator style={styles.spinner} size="large" />
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    color: '#fff'
  }
};

export default SplashScreen;
