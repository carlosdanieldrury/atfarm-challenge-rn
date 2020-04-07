import React from 'react';
import { View, Text } from 'react-native';

export default class FieldDetailsScreen extends React.Component {
  render() {
    // params were passed by navigation, let's use props.navigation.state.params to get
    // the field (JSON) and parse it to an object
    const field = JSON.parse(this.props.navigation.state.params.field);

    return(
    <View>
      <Text>Name: {field.name}</Text>
      <Text>Crop Type: {field.cropType}</Text>
      <Text>Area: {field.area}</Text>
    </View>
    );
  }
}

FieldDetailsScreen.navigationOptions = {
  title: 'Field Details ',
};
