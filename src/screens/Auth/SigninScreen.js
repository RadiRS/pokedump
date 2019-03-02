import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar, StyleSheet } from 'react-native';
import { View, Text, Button, Form, Item, Label, Input } from 'native-base';
import { signinUser } from '../../stores/actions';

StatusBar.setHidden(false);

class SigninScreen extends Component {
  state = {
    email: '',
    password: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error.message);
    }
  }

  handleLoginButton = () => {
    const data = this.state;
    this.props.signinUser(data);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Sign in</Text>
        <Text style={styles.textSubTitle}>
          Ideas thet set your mind in motion
        </Text>
        <Form style={styles.form}>
          <Label style={styles.formLabel}>Your email</Label>
          <Item style={styles.formItem}>
            <Input
              onChangeText={value => this.setState({ email: value })}
              style={styles.formInput}
              textContentType="emailAddress"
            />
          </Item>
          <Label style={styles.formLabel}>Your password</Label>
          <Item style={styles.formItem}>
            <Input
              onChangeText={value => this.setState({ password: value })}
              style={styles.formInput}
              secureTextEntry={true}
            />
          </Item>
          <Button
            onPress={() => this.handleLoginButton()}
            style={styles.button}
          >
            <Text uppercase={false} style={styles.textButton}>
              Login
            </Text>
          </Button>
        </Form>
        <Text style={styles.textAlready}>
          Dont have account ? {'\t'}
          <Text
            style={styles.textSignin}
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            Sign up
          </Text>
        </Text>
        <Text style={styles.textFooter}>
          By creating an account, i accept Meet Blog's {'\n'}
          Terms of Services
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF3EB'
  },
  textTitle: {
    // fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 50,
    marginBottom: 30,
    textAlign: 'center'
  },
  textSubTitle: {
    // fontFamily: 'Marat Sans Light',
    width: '60%',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center'
  },
  textButton: {
    fontFamily: 'Marat Sans Demibold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    paddingLeft: 0
  },
  textFooter: {
    fontFamily: 'Marat Sans Light',
    marginTop: 100,
    fontSize: 20,
    color: '#8E9A95',
    textAlign: 'center',
    position: 'absolute',
    bottom: 20
  },
  textAlready: {
    // fontFamily: 'Marat Sans Light',
    fontSize: 20,
    color: '#8E9A95',
    marginTop: 50
  },
  textSignin: {
    // fontFamily: 'Marat Sans Light',
    fontSize: 20,
    color: '#079D75'
  },
  button: {
    backgroundColor: '#079D75',
    width: 250,
    height: 60,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
  form: {
    height: 300,
    width: '90%',
    alignItems: 'center',
    marginTop: 30
  },
  formLabel: {
    // fontFamily: 'Marat Sans Light',
    fontSize: 22
    // marginVertical: 10
  },
  formItem: {
    marginBottom: 10
  },
  formInput: {
    // marginBottom: 10
  }
});

const mapStateToProps = ({ error }) => ({
  error
});

const mapDispatchToProps = {
  signinUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreen);
