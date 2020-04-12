import React from 'react';
import { View, SafeAreaView, FlatList, SectionList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { API_ABSOLUTE_PATH } from '../config/Config';
import { styles } from '../assets/styles/stylesheets';
import ActionButton from 'react-native-action-button';
import { Card, Button } from 'react-native-elements';
import i18n, { translate } from '../config/i18n';
import { SearchBar } from 'react-native-elements';

export default class FieldsListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, hasAnyErrors: false, dataSource: [], dataSourceHolder : [], search: '' };
  }

  async componentDidMount() {
    try {
      const response = await fetch(API_ABSOLUTE_PATH);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();

      // sections
      const dataSource = this.groupByCropType(json)
      console.log('Data source filtered', JSON.stringify(dataSource))
      this.setState({ isLoading: false, dataSource: dataSource, dataSourceHolder: dataSource, hasAnyErrors: false });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, hasAnyErrors: true })
    }
  }

  groupByCropType(objetoArray) {
    var sections = [];

    var objArray = []
    objetoArray.forEach(element => {
      var cropTypeName = null
      if (element['cropType'] == null) {
        cropTypeName = "UNDEFINED"
      } else {
        cropTypeName = element['cropType'].toUpperCase()
      }
      objArray.push({
        name: element.name,
        cropType: cropTypeName,
        area: element.area
      })
    });

    objArray.forEach(newElement => {
        var titleName = newElement['cropType']
        let indexSection = sections.findIndex(i => i.title == titleName)
        if (indexSection != -1) {
          sections[indexSection].data.push(newElement)
        } else {
          sections.push({ title : titleName, data : [ newElement ] })
        }
    });

    return sections
  }
  
  clear = () => {
    this.search.clear();
    this.setState({dataSource: this.state.dataSourceHolder})
  };

  SearchFilterFunction(text) {
    const newData = this.state.dataSourceHolder.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    const { navigation } = this.props;
    const columns = 2;

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
          <Text>{translate('fieldsList.error_downloading')}</Text>
        </View>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
          <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder={translate('fieldsList.type_text')}
          value={this.state.search}
        />
        <View style={styles.list}>
        <SectionList
            sections={ this.state.dataSource }
            renderItem={({ item }) => <Text>{item.name}</Text>}
            renderSectionHeader={({ section }) => (
              <Text>{section.title}</Text>
            )}
            keyExtractor={(item, index) => item + index}
          />

          {/* <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={columns}
            enableEmptySections={true}
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
                          <Button title={translate('fieldsList.see_more')}
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
          /> */}
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
