// React Native Tab
// https://aboutreact.com/react-native-tab/

import * as React from 'react';
import CalendarStrip from 'react-native-calendar-strip';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput
} from 'react-native';

const NutritionalTracker = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CalendarStrip
    scrollable
    style={{height:100, paddingTop: 20, paddingBottom: 10}}
    calendarColor={'#3343CE'}
    calendarHeaderStyle={{color: 'white'}}
    dateNumberStyle={{color: 'white'}}
    dateNameStyle={{color: 'white'}}
    iconContainer={{flex: 0.1}}
  />

      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              marginBottom: 16
            }}>
            Water Intake
          </Text>

          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 16
            }}>
          10 oz / 120 oz
          </Text>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              marginBottom: 16
            }}>
            Calorie Intake
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => navigation.navigate('FourthPage')
            }>
            <Text>Set Goals</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default NutritionalTracker;
