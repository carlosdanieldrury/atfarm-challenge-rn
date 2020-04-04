import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import FieldsListScreen from '../screens/FieldsListScreen';
import NewFieldScreen from '../screens/NewFieldScreen';
import FieldDetailsScreen from '../screens/FieldDetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const FieldsStack = createStackNavigator(
  {
    FieldsList: FieldsListScreen,
  },
  config
);

FieldsStack.navigationOptions = {
  tabBarLabel: 'Fields',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-list"
    />
  ),
};

FieldsStack.path = '';

const NewFieldStack = createStackNavigator(
  {
    NewField: NewFieldScreen,
  },
  config
);

NewFieldStack.navigationOptions = {
  tabBarLabel: 'Add Field',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-add" />
  ),
};

NewFieldStack.path = '';

const tabNavigator = createBottomTabNavigator({
  FieldsStack,
  NewFieldStack,
});

tabNavigator.path = '';

export default tabNavigator;
