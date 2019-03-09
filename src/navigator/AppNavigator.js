import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
// Components
import DrawerNavigator from '../components/common/drawer/DrawerNavigator';
// Screens
import {
  Home,
  Splash,
  DetailPokemon,
  AddPokemon,
  MapPokemon,
  Signin,
  Signup
} from '../screens';

// Home Stack Navigator
const AppHomeStackNavigator = createStackNavigator({
  Home,
  DetailPokemon,
  AddPokemon,
  Map: {
    screen: MapPokemon
  }
});

// Profile Stack Navigator
// const AppProfileStackNavigator = createStackNavigator({
//   Profile,
//   UserProfile,
//   UpdateProfile
// });

// App Drawer Navigator
const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppHomeStackNavigator
    }
  },
  {
    drawerPosition: 'left',
    drawerType: 'slide',
    drawerWidth: 400,
    contentComponent: DrawerNavigator,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToogleRoute: 'DrawerToggle'
  }
);

// App Switch Navigator
const AppSwitchNavigator = createSwitchNavigator({
  Splash,
  // AuthMethod,
  AppDrawerNavigator,
  Signin,
  Signup
});

// App Container
const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
