import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList
  } from 'react-native';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyA9y2gTa8nVTYqS1EOBiV9ZRFQaZXpXb-k",
  authDomain: "testing-7dd4b.firebaseapp.com",
  databaseURL: "https://testing-7dd4b.firebaseio.com",
  projectId: "testing-7dd4b",
  storageBucket: "testing-7dd4b.appspot.com",
  messagingSenderId: "677446189881"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todo: '',
      todos: null,
      editable: false
    }
  }

  componentDidMount() {
    const firebase = require('firebase');
    firebase.database().ref('todos/').on('value', (snapshot) => {
      const todos = snapshot.val()
      this.setState({todos: todos})
    })
  }

  storeTodo() {
    const newTodoKey = firebase.database().ref().child('todos').push().key;
    firebase.database().ref('todos/').update({
      [newTodoKey]: this.state.todo
    })
  }

  removeTodo(key) {
    firebase.database().ref('todos/' + key).remove()
  }

  render() {
    const todos = !this.state.todos ? [] : Object.keys(this.state.todos).map( key => {
      return {
        key: key,
        text: this.state.todos[key]
      }
    })
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={"insert new todo"}
          onChangeText={(text) => this.setState({todo: text})}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
        />
        <Button title={"add Todo"} onPress={() => this.storeTodo()}/>
        <FlatList
          data={todos}
          renderItem={({item}) => {
            return (
              <View style={styles.todoBracket}>
                <TextInput
                  style={{marginLeft: 0, color: 'black', flex: 1}}
                  editable={this.state.editable}
                >
                  {item.text}
                </TextInput>
                <View style={{marginTop: 10}}>
                  <Button
                    title={"delete"}
                    onPress={() => this.removeTodo(item.key)}
                  />
                </View>
                <View style={{marginTop: 10, marginLeft: 10}}>
                  <Button
                    title={"edit"}
                    onPress={() => this.removeTodo(item.key)}
                  />
                </View>
              </View>
            )
          }}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  width: '100%',
  height: '100%'
  },
  textInput: {
    width: 300,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20
  },
  todoBracket: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: 300,
    height: 60,
    flexDirection: 'row'
  }
});

