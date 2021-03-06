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
  Picker,
  CheckBox
} from 'native-base';
// Action
import {
  getCategories,
  getTypes,
  authenticatedUser,
  addPokemon
} from '../../stores/actions';
// Themes
import { Colors } from '../../themes';
// Components
import ButtonLabel from '../../components/common/button/ButtonLabel';
import ButtonIcon from '../../components/common/button/ButtonIcon';
import PickImage from '../../components/pickImage/PickImage';

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
          {isAuthenticated ? (
            <ButtonLabel
              onPress={() => handleSaveButton()}
              transparent
              label="Save"
            />
          ) : null}
        </View>
      )
    };
  };

  state = {
    name: '',
    image_url: '',
    latitude: '',
    longitude: '',
    user_id: '',
    category_id: '',
    type_ids: []
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

  handleCheckType = value => {
    const { type_ids } = this.state;
    let data = type_ids.find(type_id => type_id === value);

    if (data) {
      data = type_ids.filter(id => id !== value);
      this.setState({ type_ids: data });
    } else {
      this.setState({
        type_ids: [...type_ids, value]
      });
    }
  };

  handleImagePick = value => {
    this.setState({ image_url: value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error.message) {
      alert(nextProps.error.message);
    }
    if (nextProps.user.data) {
      this.props.navigation.setParams({
        isAuthenticated: true
      });
      alert('adata');
    }
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getTypes();
    this.props.navigation.setParams({
      isAuthenticated: this.props.isAuthenticated
    });
    this.props.navigation.setParams({
      handleSaveButton: this.handleSaveButton
    });
    this.setState({ user_id: this.props.user.id });
  }

  render() {
    const { categories, isAuthenticated, types } = this.props;
    const { type_ids } = this.state;

    if (isAuthenticated) {
      return (
        <Container>
          <Content padder>
            <View
              style={{
                flex: 1,
                height: 300
              }}
            >
              <PickImage handleImagePick={this.handleImagePick} />
            </View>

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
                  style={{ width: '100%' }}
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
              </Item>
              <Item
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                stackedLabel
              >
                <Label>Types</Label>
                {types.map(type => (
                  <View
                    key={type.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 10
                    }}
                  >
                    <CheckBox
                      checked={
                        type_ids.find(id => id === type.id) ? true : false
                      }
                      onPress={() => this.handleCheckType(type.id)}
                    />
                    <Text style={{ marginLeft: 15, fontSize: 20 }}>
                      {type.name}
                    </Text>
                  </View>
                ))}
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
            <View style={{ alignItems: 'center' }}>
              <ButtonLabel
                onPress={() => this.props.navigation.navigate('Signin')}
                label="Login"
              />
            </View>
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

const mapStateToProps = ({ categories, types, user, error }) => ({
  categories: categories.data,
  types: types.data,
  isAuthenticated: user.isAuthenticated,
  user: user.data,
  error
});

const mapDispatchToProps = {
  getCategories,
  getTypes,
  authenticatedUser,
  addPokemon
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPokemonScreen);
