/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import Loader from './Loader';
import firebase from 'firebase';

const LoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();
 
const styles = StyleSheet.create({
    form: {
        marginTop:20,
        paddingBottom: 10,
        width: 200,
    },
    fieldStyle: {
        height:40,
        color: MKColor.Grey,
        width: 200
    },
    loginButtonArea: {
        marginTop:20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    },
});

export default class Login extends Component {
  state = {
      email: '',
      password: '',
      error:'',
      loading: false,
  };

  onButtonPress() {
      const { email, password } = this.state;
      this.setState({error: '', loading: true});

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onAuthSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onAuthSuccess.bind(this))
                .catch(this.onAuthFailed.bind(this));
        });
  }

  onAuthSuccess() {
      this.setState({
        email: '',
        password: '',
        error: '',
        loading: false,
      });
  }

  onAuthFailed(){
      console.log(this);
      this.setState({
        error: 'Authentification Failed',
        loading: false,
      });
  }

  renderLoader() {
      if(this.state.loading) {
          return <Loader size="large" />
      } else {
          return <LoginButton onPress={this.onButtonPress.bind(this)} />
      }
  }

  render() {
    const {form,container,fieldStyle, loginButtonArea, errorMessage} = styles;
    return (
      <View style={container}>
        <Text style={{alignSelf: 'center'}}>Login or Sign Up</Text>
        <View style={form}>    
            <MKTextField 
                text={this.state.email}
                onTextChange={email => this.setState({ email })}
                textInputStyle={fieldStyle}
                placeholder='Email...'
                tintColor={MKColor.Lime}
            />
            <MKTextField 
                text={this.state.password}
                onTextChange={password => this.setState({ password })}
                textInputStyle={fieldStyle}
                placeholder='Password ...'
                tintColor={MKColor.Lime}
                password={true}
            />
            <Text style={errorMessage}>
                {this.state.error}
            </Text>
            <View style={loginButtonArea}>
                {this.renderLoader()}
            </View>
        </View>
      </View>
    );
  }
}


