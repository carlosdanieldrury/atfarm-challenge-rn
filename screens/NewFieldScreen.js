import React, { Component, Fragment } from 'react';
import { View, Picker, StyleSheet, TextInput, Text, Button, ActivityIndicator } from 'react-native';
import { API_ABSOLUTE_PATH } from '../config/Config';
import * as yup from 'yup';
import { Formik } from 'formik';
import i18n, { translate } from '../config/i18n';


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
          <Text>{translate('newField.error_create')}</Text>
        </View>
      )
    }

    if (this.state.success) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
        <Text>{translate('newField.success_create')}</Text>
          <Text 
              onPress={() => {
                this.setState({ success: false });
              }}>{translate('newField.create_new')}</Text>
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
                .min(2, translate('newField.validation_name'))
                .required(),
          cropType: yup
                .string()
                .required(),
          area: yup
                .number("area")
                .max(1000, translate('newField.validation_area_min_max'))
                .min(1, translate('newField.validation_area_min_max'))
                .required()

        }) }
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            <TextInput
              value= {values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              placeholder={translate('common.name')}
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
              placeholder={translate('common.area')}
              onBlur={() => setFieldTouched('area')}
            />
            {touched.area && errors.area &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.area}</Text>
            }
            <Button
              title={translate('newField.send')}
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
  title: translate('newField.title'),
};
