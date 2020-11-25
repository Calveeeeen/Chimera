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


export default class Socials extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      watergoal: '',
      caloriegoal:'',
      exercisegoal:''
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



  }

  updatedata = () =>{
    var user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid + '/goals').set({
      "calories" : parseInt(this.state.caloriegoal),
      "exercise" : parseInt(this.state.exercisegoal),
      "water" : parseInt(this.state.watergoal)
    });

  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
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
            <TouchableOpacity style={styles.buttonContainer} onPress={() => getUser()}>
              <Text>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Twitter</Text>
            </TouchableOpacity>
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
