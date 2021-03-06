import React from 'react';
import { View, SafeAreaView, FlatList, SectionList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { API_ABSOLUTE_PATH } from '../config/Config';
import { styles } from '../assets/styles/stylesheets';
import ActionButton from 'react-native-action-button';
import { Card, Button } from 'react-native-elements';
import i18n, { translate } from '../config/i18n';
import { SearchBar, Header } from 'react-native-elements';
import { SectionGrid } from 'react-native-super-grid';

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

      const dataSource = this.groupByCropType(json)
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
    var newData = this.state.dataSourceHolder
    if (text != '') {
      var sections = []
      this.state.dataSourceHolder.forEach(item => {
        var filteredItems = []
        item.data.forEach(element => {
          if (element.name.includes(text) || element.cropType.includes(text) ) {
            filteredItems.push(element)
          }
        })
          sections.push({
            title: item.title,
            data: filteredItems
          })
      });
      newData = sections
  }
  
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
        <SectionGrid
            columns={columns}
            itemDimension={180}
            sections={ this.state.dataSource }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item}
                  onPress={ () => {
                    navigation.navigate('FieldDetailsScreen', {
                      field: JSON.stringify(item),
                    });
                  }}>
                <Card 
                  containerStyle={{padding: 10}}
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
            )}
            renderSectionHeader={({ section }) => (
              <Header centerComponent={ <Text style={{ fontSize: 20, color: '#fff' }}>{section.title}</Text>} />
            )}
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
