// SearchResultsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchResultsScreen = ({ navigation }) => {
  const results = [
    { id: '1', name: 'Burger Shop', distance: '2.7km' },
    { id: '2', name: 'Shopping mall', distance: '4.0km' },
    { id: '3', name: 'Coffee Shop', distance: '1.8km' },
    { id: '4', name: 'Shopping center', distance: '4.8km' },
    { id: '5', name: 'Shopping Villa', distance: '6.0km' },
    { id: '6', name: 'Goldman Shop', distance: '3.0km' },
    { id: '7', name: 'Citygroup Shop', distance: '3.6km' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text style={styles.resultName}>{item.name}</Text>
      <Text style={styles.resultDistance}>{item.distance}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Shop"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultsText}>Results for "shop": {results.length} found</Text>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  cancelButton: {
    color: '#FFB900',
    fontWeight: 'bold',
  },
  resultsText: {
    padding: 15,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultName: {
    fontSize: 16,
  },
  resultDistance: {
    color: '#999',
  },
});

export default SearchResultsScreen;