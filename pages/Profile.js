// React Native Tab
// https://aboutreact.com/react-native-tab/

import React, { Component } from 'react';
import firebase from '../database/firebase';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput
} from 'react-native';


export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      date: new Date(),
      name: '',
      watergoal: '',
      caloriegoal:'',
      exercisegoal:'',
      dailywater:'0',
      dailycalories:'',
      dailyexercise:'',
      score:''
    }
    this.pulldata();
  }

  pulldata = () => {

    const userid = firebase.auth().currentUser.uid;

    var nameref = firebase.database().ref('users/' + userid + '/username');
    nameref.on('value', (snapshot) =>{
    const data = snapshot.val();
    this.state.name = data
    const state = this.state;
    this.setState(state);

    })

    var watergoalref = firebase.database().ref('users/' + userid + '/goals/water');
    watergoalref.on('value', (snapshot) =>{
    const data = snapshot.val();
    this.state.watergoal = data
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

    var exercisegoalref = firebase.database().ref('users/' + userid + '/goals/exercise');
    exercisegoalref.on('value', (snapshot) =>{
    const data = snapshot.val();
    this.state.exercisegoal = data
    const state = this.state;
    this.setState(state);

    })

    var date = this.getDateString()
    var dailyref= firebase.database().ref('users/' + userid + '/log/' + date);
    dailyref.on('value', (snapshot) =>{
      if (snapshot.exists()){

        const data = snapshot.val();
        this.state.score = data.score
        this.state.dailywater = data.stats.water
        this.state.dailycalories= data.stats.calories
        this.state.dailyexercise= data.stats.exercise
        const state = this.state;
        this.setState(state);
        this.updateScore();
        }
      else {

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
    firebase.database().ref('users/' + user.uid + '/goals').set({
      "calories" : parseInt(this.state.caloriegoal),
      "exercise" : parseInt(this.state.exercisegoal),
      "water" : parseInt(this.state.watergoal)
    });

  }

   updateScore = () =>{
       var user = firebase.auth().currentUser;
       const userid = firebase.auth().currentUser.uid;
       var date = this.getDateString()
       var waterScore = this.state.dailywater / this.state.watergoal * 100
       var calorieScore = this.state.dailycalories / this.state.caloriegoal * 100
       var exerciseScore = this.state.dailyexercise / this.state.exercisegoal * 100
       var totalScore = (waterScore + calorieScore + exerciseScore) / 3
       firebase.database().ref('users/' + userid + '/log/' + date + "/score").set(
         totalScore
       );

   }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
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
    <ScrollView style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View>
            <Text style={styles.name}>{this.state.name}</Text>

            <View
              style={styles.row}>
              <Text
                style={styles.label}>
                  Water Goal:
              </Text>
              <TextInput
                style={styles.inputStyle}
                value= {this.state.watergoal.toString()}
                onChangeText={(val) => this.updateInputVal(val, 'watergoal')}
                keyboardType={'numeric'}
              />
              <Text
                style={styles.label}>
                  oz
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => this.updatedata()}>
                <Text>Update</Text>
              </TouchableOpacity>

              </View>

              <View
                style={styles.row}>
                <Text
                  style={styles.label}>
                    Calorie Goal:
                </Text>
                <TextInput
                  style={styles.inputStyle}
                  value= {this.state.caloriegoal.toString()}
                  onChangeText={(val) => this.updateInputVal(val, 'caloriegoal')}
                  keyboardType={'numeric'}
                />
                <Text
                  style={styles.label}>
                    cals
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.updatedata()}>
                  <Text>Update</Text>
                </TouchableOpacity>

                </View>

                <View
                  style={styles.row}>
                  <Text
                    style={styles.label}>
                      Exercise Goal:
                  </Text>
                  <TextInput
                    style={styles.inputStyle}
                    value= {this.state.exercisegoal.toString()}
                    onChangeText={(val) => this.updateInputVal(val, 'exercisegoal')}
                    keyboardType={'numeric'}
                  />
                  <Text
                    style={styles.label}>
                      minutes
                  </Text>
                  <TouchableOpacity style={styles.button} onPress={() => this.updatedata()}>
                    <Text>Update</Text>
                  </TouchableOpacity>

                  </View>

                  <Text style={styles.name}>Today's Numbers</Text>

                  <Text
                    style={styles.label}>
                      Water: {this.state.dailywater} oz
                  </Text>
                  <Text
                    style={styles.label}>
                      Calories: {this.state.dailycalories} cals
                  </Text>
                  <Text
                    style={styles.label}>
                      Exercise: {this.state.dailyexercise} minutes
                  </Text>
                  <Text style={styles.name}>Chimera Score: {Number(this.state.score).toFixed(2)}</Text>





          </View>
      </View>
    </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: 20,
    width: 100

  },
  header:{
    backgroundColor: "#00BFFF",
    height:100,
  },
  avatar: {
    width: 130,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:50
  },

  body:{
    marginTop:40,
      alignItems: 'center',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    textAlign: 'center'
  },


  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  label : {
      fontSize: 16,
      textAlign: 'center',
      marginRight: 10

  },
  inputStyle: {
    width: '10%',
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginRight: 10
  },
  row:{
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    alignSelf: "center",
  }
});
