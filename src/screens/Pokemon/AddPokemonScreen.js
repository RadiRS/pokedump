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
// Themes
import { Colors } from '../../themes';
// Components
import ButtonLabel from '../../components/common/button/ButtonLabel';
import ButtonIcon from '../../components/common/button/ButtonIcon';

class AddPokemonScreen extends Component {
  static navigationOptions = ({ navigation }) => {
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
          <ButtonLabel transparent label="Save" />
        </View>
      )
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Url Image</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Category</Label>
              {/* <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker> */}
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Type</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPokemonScreen);
