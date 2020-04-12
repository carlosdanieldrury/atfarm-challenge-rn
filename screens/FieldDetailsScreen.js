import React from 'react';
import { View, Text } from 'react-native';
import i18n, { translate } from '../config/i18n';

export default class FieldDetailsScreen extends React.Component {
  render() {
    const field = JSON.parse(this.props.navigation.state.params.field);

    return(
    <View>
      <Text>{translate('common.name')}: {field.name}</Text>
      <Text>{translate('common.cropType')}: {field.cropType}</Text>
      <Text>{translate('common.area')}: {field.area}</Text>
    </View>
    );
  }
}

FieldDetailsScreen.navigationOptions = {
  title: translate('fieldDetails.title'),
};
