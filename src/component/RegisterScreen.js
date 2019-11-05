import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axiosInstance from '../service/baseUrl';
import Toast from 'react-native-easy-toast'

class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      useremail: '',
      password: '',
      showPass: true,
      validatedemail: false,
      validatedpass: false,
      loading: false,
    };
  }

  handleSubmit = () => {
    if (this.state.validatedemail && this.state.validatedpass) {
      axiosInstance({
        method: 'POST',
        url: '/register',
        data: {
          email: this.state.useremail,
          password: this.state.password,
          name: this.state.name,
        },
      })
        .then(response => {
          //console.log(response);
          this.props.navigation.navigate('Logout');
        })
        .catch(error => {
          alert('Email already registered');
          //console.log(error);
        });
    } else {
      this.refs.toast.show('sultan jelek');
    }
    
  };

  handleVisibelpassword() {
    this.setState({
      showPass: !this.state.showPass,
    });
  }

  handleEmail(useremail) {
    this.state.useremail = useremail;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(useremail) === true) {
      this.setState({
        validatedemail: true,
      });
    } else {
      this.setState({
        validatedemail: false,
      });
    }
  }

  handlePassword = text => {
    this.setState({password: text});
    if (text == '') {
      this.setState({
        validatedpass: false,
      });
    } else {
      this.setState({
        // password: text,
        validatedpass: true,
      });
    }
  };

  render() {
    const disableLogin = true
    ////console.log(this.props.navigation)

    return (
      <KeyboardAvoidingView  style={styles.container} behavior="position" enabled>
        <Toast 
          ref="toast"
          style={{backgroundColor:'#E04A3A'}}
        />
        <View style={styles.logoContainer}>
          <Image
            style={{
              width: 180,
              height: 101
            }}
            source={{uri: 'https://cdn1.iconfinder.com/data/icons/hotel-146/32/bed-travel-booking-512.png'}}
          />
          <Text style={{fontSize: 13, color: 'rgba(0,0,0,0.7)', marginTop: 7}} >Register Admin</Text>
        </View>

        <View style={styles.emailcontainer}>
          <TextInput
            onChangeText={text => this.setState({name: text})}
            value={this.state.name}
            style={{padding: 12}}
            placeholder=" Inpur Your Name"></TextInput>
        </View>

        <View style={styles.emailcontainer}>
          <TextInput
            onChangeText={useremail => this.handleEmail(useremail)}
            value={this.state.useremail}
            style={{padding: 12}}
            placeholder="Input Your Email"></TextInput>
        </View>

        <View style={styles.passwordcontainer}>
          <View style={{flex: 4.5}}>
            <TextInput
              onChangeText={text => this.handlePassword(text)}
              secureTextEntry={this.state.showPass}
              value={this.state.password}
              style={{padding: 12}}
              placeholder="Password"
            />
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.handleVisibelpassword.bind(this)}>
              {this.state.showPass ? (
                <Icon
                  style={{padding: 15}}
                  name="eye-with-line"
                  size={20}
                  color="#000000"
                />
              ) : (
                <Icon
                  style={{padding: 15}}
                  name="eye"
                  size={20}
                  color="#000000"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.handleSubmit.bind(this)}
            disabled={disableLogin ? false : true}
            style={disableLogin ? styles.btn2 : styles.btn1}>
            <Text style={{fontSize: 18, color: 'white'}}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView >
    );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  emailcontainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 5,
    elevation: 3,
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  passwordcontainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 5,
    elevation: 3,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
  },
  logincontainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 60,
    marginHorizontal: 90,
    justifyContent: 'center',
    elevation: 8,
    borderRadius: 30,
  },
  logintext: {
    fontSize: 32,
    justifyContent: 'center',
  },
  textcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  btn1: {
    width: '80%',
    padding: 15,
    backgroundColor: '#3a3a3a',
    borderRadius: 50,
    elevation: 3,
    marginTop: 35,
    marginBottom: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btn2: {
    width: '80%',
    padding: 18,
    backgroundColor: '#3a3a3a',
    borderRadius: 50,
    elevation: 9,
    marginHorizontal: 70,
    marginTop: 35,
    marginBottom: 15,
    alignItems: 'center',
    alignSelf: 'center'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 50
  },
});
