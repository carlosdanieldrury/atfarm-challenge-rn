import React from 'react';
import { View, SafeAreaView, ScrollView, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { API_ABSOLUTE_PATH } from '../config/Config'

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
      <ScrollView>
        <SafeAreaView style={styles.list}>
          <FlatList
            keyExtractor={item => item.id}
            numColumns={columns}
            data = {this.state.dataSource}
            renderItem={({ item }) => {
              if (item.empty) {
                return <View style={[styles.item, styles.itemEmpty]} />;
              }
              return (
                <View style={styles.item}>
                  <Text 
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('FieldDetailsScreen', {
                      field: JSON.stringify(item),
                    });
                  }}
                  style={styles.text}>{item.name}, {item.cropType}, {item.area}</Text>
                </View>
              );
            }}
            keyExtractor={({ id }, index) => id}
          />
      </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  list: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  item: {
    flex: 1, flexDirection: 'column', margin: 20
  },
  itemEmpty: {
    backgroundColor: "transparent"
  }
});

FieldsListScreen.navigationOptions = {
  title: 'Fields List',
};
