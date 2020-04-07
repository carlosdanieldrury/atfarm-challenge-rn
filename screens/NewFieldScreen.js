import React from 'react';
import { View, Picker, StyleSheet, TextInput } from 'react-native';
import { API_ABSOLUTE_PATH } from '../config/Config'

export default class NewFieldScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, hasAnyErrors: false, success: false };
  }

  postData = async(str) => {
    try {
      let res = await fetch(API_ABSOLUTE_PATH, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          str,
        }),
      });
      res = await res.json();
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidMount() {
    await this.postData("")
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

    if (this.state.success) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Success! Field has been created on the server!</Text>
          <Text 
              onPress={() => {
                //this.setState = { success = false };
              }}>Create a new one!</Text>
        </View>
      )
    }

    return (
      <View>
        <TextInput 
          placeholder="Name" />
          <Picker selectedValue={cropTypes.cotton.title}>
              <Picker.Item label={ cropTypes.cotton } value={ cropTypes.cotton.title }/>
              <Picker.Item label={ cropTypes.maize } value={ cropTypes.maize.title }/>
              <Picker.Item label={ cropTypes.oats } value={ cropTypes.oats.title }/>
              <Picker.Item label={ cropTypes.wheat } value={ cropTypes.wheat.title }/>
          </Picker>
          <TextInput
            placeholder="Area" />
      </View>
    );
  }
}

const cropTypes = {
  cotton: "Cotton",
  maize: "Maize",
  oats: "Oats",
  wheat: "Wheat"
}

const styles = StyleSheet.create ({

});

NewFieldScreen.navigationOptions = {
  title: 'New Field',
};
