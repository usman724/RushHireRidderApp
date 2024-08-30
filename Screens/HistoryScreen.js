// HistoryScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HistoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const historyData = [
    { id: '1', name: 'Nate', status: 'Upcoming', time: 'Today at 10:30 am' },
    { id: '2', name: 'Henry', status: 'Completed', time: 'Yesterday at 2:15 pm' },
    { id: '3', name: 'William', status: 'Cancelled', time: 'Tomorrow at 9:00 am' },
    // Add more history items as needed
  ];

  const filteredData = historyData.filter(item => 
    item.status.toLowerCase() === activeTab.toLowerCase()
  );

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyName}>{item.name}</Text>
      <Text style={styles.historyTime}>{item.time}</Text>
      <Text style={[styles.historyStatus, { color: getStatusColor(item.status) }]}>
        {item.status}
      </Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming': return '#FFB900';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      default: return 'black';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.tabContainer}>
        {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderHistoryItem}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    fontSize: 16,
    color: '#FFB900',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FFB900',},
    tabText: {
      fontSize: 16,
    },
    activeTabText: {
      color: 'white',
      fontWeight: 'bold',
    },
    listContainer: {
      paddingHorizontal: 15,
    },
    historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    historyName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    historyTime: {
      color: '#999',
    },
    historyStatus: {
      fontWeight: 'bold',
    },
  });
  
  export default HistoryScreen;