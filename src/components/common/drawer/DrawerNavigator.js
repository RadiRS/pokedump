import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  List,
  ListItem,
  Text,
  Thumbnail,
  View
} from 'native-base';
import NavigationServices from '../../../navigator/NavigationServices';
import { _removeData } from '../../../helpers/asynStorage';
import { logoutUser } from '../../../stores/actions';

class DrawerNavigator extends Component {
  state = {
    data1: ['Home', 'Audio', 'Bookmarks', 'Interests'],
    data2: ['Become a member'],
    data3: ['New post', 'Stats', 'Posts'],
    data4: ['Settings', 'Help'],
    user: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({ user: nextProps.user });
    }
  }

  componentDidMount() {
    // this.props.authenticatedUser();
    // this.props.navigation.setParams({
    //   handleSignout: _removeData('token')
    // });
  }

  keyExtractor = item => item.toString();

  renderItem = ({ item }) => (
    <ListItem onPress={() => alert(item)} noBorder>
      <Text style={styles.textList}>{item}</Text>
    </ListItem>
  );

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headers}>
          <Thumbnail
            style={styles.avatarThumbnail}
            source={
              {
                // uri: this.state.profile.avatar
              }
            }
          />
          <Text style={styles.textName}>{this.state.user.username}</Text>
          {this.props.user ? (
            <Text
              onPress={() => this.props.logoutUser()}
              style={styles.textSub}
            >
              Signout
            </Text>
          ) : null}
        </Header>
        <Content contentContainerStyle={styles.contentContainer}>
          <ListItem
            onPress={() => NavigationServices.navigate('Home')}
            noBorder
          >
            <Text style={styles.textList}>Home</Text>
          </ListItem>

          <View style={styles.listFooter}>
            <Thumbnail
              square
              style={styles.logoThumbnail}
              source={{ uri: 'http://lorempixel.com/640/480' }}
            />
            <FlatList
              horizontal
              style={styles.flatListFooter}
              data={this.state.data4}
              keyExtractor={item => this.keyExtractor(item)}
              renderItem={item => this.renderItem(item)}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    // paddingLeft: 20
  },
  contentContainer: {
    // paddingLeft: 10
  },
  headers: {
    backgroundColor: '#079D75',
    height: 200,
    flexDirection: 'column',
    paddingLeft: 30
  },
  avatarThumbnail: {
    height: 80,
    width: 80,
    borderRadius: 100
  },
  textName: {
    fontSize: 30,
    marginVertical: 10,
    fontFamily: 'Marat Sans Light',
    color: '#fff'
  },
  textSub: {
    fontSize: 20,
    fontFamily: 'Marat Sans Light'
  },
  flatList: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  flatListFooter: {
    // borderTopWidth: 1,
    // borderTopColor: '#f0f0f0'
  },
  listFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    // flex: 1,
    flexDirection: 'row',
    paddingTop: 20
  },
  textList: {
    fontFamily: 'Marat Sans Light',
    fontSize: 20
  },
  logoThumbnail: {
    alignSelf: 'center',
    marginLeft: 20
  }
};

const mapStateToProps = ({ user }) => ({
  user: user.data
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerNavigator);

// export default DrawerNavigator;
