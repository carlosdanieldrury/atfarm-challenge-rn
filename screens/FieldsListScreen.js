import React from 'react';
import { View, SafeAreaView, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { API_ABSOLUTE_PATH } from '../config/Config'
import { styles } from '../assets/styles/stylesheets'
import ActionButton from 'react-native-action-button';
import { Card, Button } from 'react-native-elements'
import i18n, { translate } from '../config/i18n'

export default class FieldsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, hasAnyErrors: false };
  }

  async componentDidMount() {
    try {
      const response = await fetch(API_ABSOLUTE_PATH);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ isLoading: false, dataSource: json, hasAnyErrors: false });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, hasAnyErrors: true })
    }
  }

  render() {
    const { navigation } = this.props;
    const columns = 3;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.hasAnyErrors) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>There is an error while downloading information</Text>
        </View>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.list}>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            //keyExtractor={({ id }, index) => index}
            numColumns={columns}
            data = {this.state.dataSource}
            renderItem={({ item }) => {
              if (item.empty) {
                return <View style={[styles.item, styles.itemEmpty]} />;
              }
              return (
                <TouchableOpacity style={styles.item}
                  onPress={ () => {
                    navigation.navigate('FieldDetailsScreen', {
                      field: JSON.stringify(item),
                    });
                  }}>
                <Card 
                  containerStyle={{padding: 20}}
                  style={styles.item}
                  title={item.name}>
                    {
                        <View style={styles.item}>
                          <Text style={styles.user}>{item.cropType}</Text>
                          <Text style={styles.user}>{item.area}</Text>
                          <Button title="See more"
                            type="clear"
                            onPress={ () => {
                              navigation.navigate('FieldDetailsScreen', {
                                field: JSON.stringify(item),
                              });
                            }}
                          />
                        </View>
                    }
                  </Card>
                  </TouchableOpacity>
              );
            }}
            listkey={({ id }, index) => index}
            //keyExtractor={({ id }, index) => id}
          />
          </View>
          <ActionButton
            bgColor="transparent"
            buttonColor="rgba(231,76,60,1)"
            onPress={() => { this.props.navigation.navigate('NewField') }}
          />
      </SafeAreaView>
    );
  }
}

FieldsListScreen.navigationOptions = {
  title: translate('fieldsList.title')
};
