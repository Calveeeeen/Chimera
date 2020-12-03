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

export default class FitnessTracker extends Component {

  constructor() {
    super();
    console.log("current date: " + new Date())
    this.state = {
      date: new Date(),
      water: '',
      watergoal: '',
      calories: '',
      caloriegoal:'',
      exercise:'',
      exercisegoal:''
    }
    this.pulldata();
  }
  componentDidMount() {
   this.setState(this.state);
  }
  pulldata = () => {
    const userid = firebase.auth().currentUser.uid;
    var date = this.getDateString()
    var ref = firebase.database().ref('users/' + userid + '/log/' + date);
    ref.once('value', (snapshot) =>{
      if (snapshot.exists()){

        const data = snapshot.val();
        console.log("Pulled user data water goal: " + data.goals.water)
        this.state.watergoal = data.goals.water
        this.state.caloriegoal = data.goals.calories
        this.state.exercisegoal = data.goals.exercise
        this.state.water = data.stats.water
        this.state.calories= data.stats.calories
        this.state.exercise= data.stats.exercise
        console.log("watergoal:" + data);
        const state = this.state;
        this.setState(state);

        }
      else {
            this.createEntry()
        }

    })


  }
  createEntry = () =>{

    const userid = firebase.auth().currentUser.uid;
    var date = this.getDateString()
    var goalref = firebase.database().ref('users/' + userid + '/goals');
    goalref.once('value', (snapshot) =>{
    const data = snapshot.val();
    var ref = firebase.database().ref('users/' + userid + '/log/' + date);
    ref.set({
      "goals" : {
        "calories" : data.calories,
        "exercise" : data.exercise,
        "water" : data.water
      },
      "score" : 0,
      "stats" : {
        "calories" : 0,
        "exercise": 0,
        "water" : 0
      }
    }
    );
    })


  }

  updatedata = () =>{
    var user = firebase.auth().currentUser;
    const userid = firebase.auth().currentUser.uid;
    var date = this.getDateString()
    firebase.database().ref('users/' + userid + '/log/' + date + "/stats/exercise").set(
      this.state.exercise
    );

  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateDate = (date) => {
    console.log("Selected Date: " + new Date(date))
    const state = this.state;
    state.date = new Date(date);
    this.setState(state);
    this.pulldata();
  }

  getDateString = () =>{
      var date = this.state.date;
      console.log("Debug Date: " + date)
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      //Alert.alert(date + '-' + month + '-' + year);
      // You can turn it in to your desired format
      return month + '-' + day+ '-' + year;//format: dd-mm-yyyy;
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
    selectedDate={this.state.date}
    onDateSelected={(date) => this.updateDate(date)}
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
          Time Spent Exercising
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextInput
              style={styles.inputStyle}
              value={this.state.exercise.toString()}
              onChangeText={(val) => this.updateInputVal(val, 'exercise')}
              keyboardType={'numeric'}
            />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 16
              }}>
                mins / {this.state.exercisegoal.toString()} mins
            </Text>
            <TouchableOpacity style={styles.updateButton} onPress={() => this.updatedata()}>
              <Text>Update</Text>
            </TouchableOpacity>
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
  updateButton:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    marginLeft:20,
    height: 20,
    width: 100
  },
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
