import React from 'react';
import { View, SafeAreaView, ScrollView, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default class FieldsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, hasAnyErrors: false };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://api.steinhq.com/v1/storages/5e4279e25a823204986f3b62/fields');
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

    const columns = 3;

    return (
      <ScrollView>
        <SafeAreaView style={styles.list}>
          <FlatList
            //data={this.state.dataSource}
            keyExtractor={item => item.id}
            numColumns={columns}
            data = {createRows(this.state.dataSource, columns)}
            renderItem={({ item }) => {
              if (item.empty) {
                return <View style={[styles.item, styles.itemEmpty]} />;
              }
              return (
                <View style={styles.item}>
                  <Text style={styles.text}>{item.name}, {item.cropType}, {item.area}</Text>
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

const createRows = (data, columns) => {
  const rows = Math.floor(data.length / columns); // [A]
  let lastRowElements = data.length - rows * columns; // [B]
  while (lastRowElements !== columns) { // [C]
    data.push({ // [D]
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements += 1; // [E]
  }
  return data; // [F]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  itemEmpty: {
    backgroundColor: "transparent"
  }
});

FieldsListScreen.navigationOptions = {
  title: 'Fields List',
};
