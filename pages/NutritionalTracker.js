// React Native Tab
// https://aboutreact.com/react-native-tab/
import React, { Component } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import firebase from '../database/firebase';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput
} from 'react-native';

export default class NutritionalTracker extends Component {

  constructor() {
    super();
    this.state = {
      date:'',
      water: '',
      watergoal: '',
      calories: '',
      caloriegoal:''
    }
    this.pulldata();
  }
  componentDidMount() {
   this.setState(this.state);
  }
  pulldata = () => {

    const userid = firebase.auth().currentUser.uid;

    var watergoalref = firebase.database().ref('users/' + userid + '/goals/water');
    watergoalref.on('value', (snapshot) =>{
    const data = snapshot.val();
    this.state.watergoal = data
    console.log("watergoal:" + data);
    const state = this.state;
    this.setState(state);
    })

    var caloriegoalref = firebase.database().ref('users/' + userid + '/goals/calories');
    caloriegoalref.on('value', (snapshot) =>{
    const data = snapshot.val();
    this.state.caloriegoal = data
    const state = this.state;
    this.setState(state);
    })


  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }



  render() {
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
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              style={styles.inputStyle}
              placeholder=""
              value={this.state.water}
              onChangeText={(val) => this.updateInputVal(val, 'water')}
              keyboardType={'numeric'}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 16
              }}>
                oz / {this.state.watergoal.toString()} oz
            </Text>

            </View>

          <Text
            style={{
              fontSize: 24,
              textAlign: 'center',
              marginBottom: 16
            }}>
            Calorie Intake
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              style={styles.inputStyle}
              placeholder=""
              value={this.state.calories}
              onChangeText={(val) => this.updateInputVal(val, 'calories')}
              keyboardType={'numeric'}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 16
              }}>
                cals / {this.state.caloriegoal.toString()} cals
            </Text>

            </View>
          <TouchableOpacity
            style={styles.button}
            onPress={

              () => this.props.navigation.navigate('FourthPage')
            }>
            <Text>Set Goals</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  inputStyle: {
    width: '10%',
    marginBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },

});
