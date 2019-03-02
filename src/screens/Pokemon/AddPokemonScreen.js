import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Picker
} from 'native-base';
// Action
import {
  getCategories,
  authenticatedUser,
  addPokemon
} from '../../stores/actions';
// Themes
import { Colors } from '../../themes';
// Components
import ButtonLabel from '../../components/common/button/ButtonLabel';
import ButtonIcon from '../../components/common/button/ButtonIcon';

class AddPokemonScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let isAuthenticated = navigation.getParam('isAuthenticated');
    const handleSaveButton = navigation.getParam('handleSaveButton');
    return {
      title: 'Add Pokemon',
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: Colors.tintColor,
      headerLeft: (
        <ButtonIcon
          onPress={() => navigation.goBack()}
          transparent={true}
          iconName="times"
        />
      ),
      headerRight: (
        <View style={{ alignItems: 'center' }}>
          {/* {isAuthenticated ? <ButtonLabel transparent label="Save" /> : null} */}
          <ButtonLabel
            onPress={() => handleSaveButton()}
            transparent
            label="Save"
          />
        </View>
      )
    };
  };

  state = {
    name: '',
    image_url: '',
    category_id: '',
    latitude: '',
    longitude: ''
  };

  handleSaveButton = () => {
    let data = { ...this.state };
    this.props.addPokemon(data);
  };

  onValueChange = value => {
    this.setState({
      category_id: value
    });
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.isAuthenticated) {
    //   alert(nextProps.isAuthenticated);
    // this.props.navigation.setParams({
    //   isAuthenticated: nextProps.isAuthenticated
    // });
    // }
  }

  componentDidMount() {
    // this.props.authenticatedUser();
    this.props.getCategories();
    this.props.navigation.setParams({
      isAuthenticated: this.props.isAuthenticated
    });
    this.props.navigation.setParams({
      handleSaveButton: this.handleSaveButton
    });
  }

  render() {
    const { categories, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Container>
          <Content padder>
            <Form>
              <Item stackedLabel>
                <Label>Name</Label>
                <Input onChangeText={name => this.setState({ name })} />
              </Item>
              <Item stackedLabel>
                <Label>Url Image</Label>
                <Input
                  onChangeText={image_url => this.setState({ image_url })}
                />
              </Item>
              <Item stackedLabel>
                <Label>Category</Label>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={this.state.category_id}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {categories.map(category => (
                    <Picker.Item
                      key={category.id}
                      label={category.name}
                      value={category.id}
                    />
                  ))}
                </Picker>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Latitude</Label>
                <Input onChangeText={latitude => this.setState({ latitude })} />
              </Item>
              <Item stackedLabel>
                <Label>Longitude</Label>
                <Input
                  onChangeText={longitude => this.setState({ longitude })}
                />
              </Item>
            </Form>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content padder contentContainerStyle={styles.container}>
            <Text style={styles.textWarn}>Opps... You have to login</Text>
            <ButtonLabel
              onPress={() => this.props.navigation.navigate('Signin')}
              label="Login"
            />
          </Content>
        </Container>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWarn: {
    fontSize: 30
  }
};

const mapStateToProps = ({ categories, user }) => ({
  categories: categories.data,
  isAuthenticated: user.isAuthenticated,
  user: user.data
});

const mapDispatchToProps = {
  getCategories,
  authenticatedUser,
  addPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPokemonScreen);
