/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, AppRegistry} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import reducers from '../reducers/PeopleReducer';
import Thunk from 'redux-thunk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyCFcjmJUMjEvOVGWPivw1ljr2ekaYJpAWM",
      authDomain: "crmproject-8f1d6.firebaseapp.com",
      databaseURL: "https://crmproject-8f1d6.firebaseio.com",
      projectId: "crmproject-8f1d6",
      storageBucket: "crmproject-8f1d6.appspot.com",
      messagingSenderId: "922968499834"
    });

    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        this.setState({ loggedIn: true });
      } else{
        this.setState({ loggedIn: false });
      }
    });
  }

  rendenrInitialView() {
    switch (this.state.loggedIn) {
      case true:
        return <Navigation />;
      case false:
        return <Login />;
      default:
        return <Loader size="large" />;
    }
  }

  render() {
    return (
      <Provider store={store} testID='start'>
          {this.rendenrInitialView()}
      </Provider>
    );
  }
}
