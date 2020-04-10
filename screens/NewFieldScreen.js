import React, { Component, Fragment } from 'react';
import { View, Picker, StyleSheet, TextInput, Text, Button, ActivityIndicator } from 'react-native';
import { API_ABSOLUTE_PATH } from '../config/Config'
import * as yup from 'yup'
import { Formik } from 'formik'


export default class NewFieldScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false, 
      hasAnyErrors: false, 
      success: false, 
    };
    this.submit = this.submit.bind(this)
    this.postData = this.postData.bind(this)
  }

  async postData(str) {
    try {
      this.setState({ success: false,
        hasAnyErrors: false,
        isLoading: true 
      })
      let res = await fetch(API_ABSOLUTE_PATH, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(str),
      });
      if (!res.ok) {
        this.setState({ 
          hasAnyErrors: true,
          success: false,
          isLoading: false
         });
      } else {
        this.setState({ 
          success: true,
          hasAnyErrors: false,
          isLoading: false
         })
      }
      res = await res.json();
    } catch (e) {
      this.setState({ 
        success: true,
        hasAnyErrors: false,
        isLoading: false
       })
      console.error(e);
    }
  }

  submit = values => {
      let requestBody = [
        {
          "name" : values.name,
          "cropType": values.cropType,
          "area": values.area
        }
      ]
      this.postData(requestBody)
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
                this.setState({ success: false });
              }}>Create a new one!</Text>
        </View>
      )
    }

    return (
      <Formik
        initialValues={{name: "", cropType: cropTypes[0], area: ""}}
        onSubmit={values => this.submit(values)}
        validationSchema={yup.object().shape({
          name: yup
                .string("Name")
                .min(2, "At least 2 caracters")
                .required(),
          cropType: yup
                .string()
                .required(),
          area: yup
                .number("area")
                .max(1000, "min value 1 and max value 1000")
                .min(1, "min value 1 and max value 1000")
                .required()

        }) }
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            <TextInput
              value= {values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              placeholder="Name"
            />
            {touched.name && errors.name &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
            }
            <Picker 
            value= {values.cropType} 
            selectedValue = { values.cropType }
            onValueChange={handleChange('cropType')}>
                {
                  cropTypes.map( (v) => {
                    return <Picker.Item key={v} label={v.toUpperCase()} value={v} />
                  })
                }
            </Picker>

            <TextInput
              value={values.area}
              onChangeText={handleChange('area')}
              placeholder="Area"
              onBlur={() => setFieldTouched('area')}
            />
            {touched.area && errors.area &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.area}</Text>
            }
            <Button
              title='Send'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </Fragment>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create ({
  
});

const cropTypes = [
  "cotton", "maize", "oats", "wheat"
]

NewFieldScreen.navigationOptions = {
  title: 'New Field',
};
