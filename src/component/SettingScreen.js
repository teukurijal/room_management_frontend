import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon2 from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Svg, { Ellipse } from "react-native-svg";


class ProfileScreen extends Component {
  constructor() {
    super();

    this.state = {
      image: 'https://i.ibb.co/rdjb1Yt/avatar.jpg',
    };
  }



  render() {
    const{ email, name } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.bottomcontainer}>
          <View style={{flex:1}}>
            <Svg viewBox="0 0 616.76 616.95" style={styles.ellipse}>
              <Ellipse
                strokeWidth={1}
                // fill="rgba(58,58,58,1)"
                // stroke="rgba(230, 230, 230,1)"
                fill="rgba(88,60,170,1)"
                stroke="rgba(230, 230, 230,1)"
                cx={308}
                cy={308}
                rx={308}
                ry={308}
              />
            </Svg>
            <View >
            <View style={{marginVertical:30,marginHorizontal:10}}>
            <Text style={{fontSize: 22, color: 'white', fontWeight:'bold'}}>
              SETTINGS
            </Text>
            </View>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 300 / 2,
                  overflow: 'hidden',
                  borderWidth: 2,
                  borderColor: 'black',
                  backgroundColor:'grey',
                  alignSelf:'center',
                  marginVertical:65
                }}
                source={{uri: this.state.image}}
              />
            </View>
          </View>
          <View style={{flex:0.9,backgroundColor:'white'}}>

          <View style={{alignSelf:'center',marginVertical:10}}>
            <Text style={{fontSize: 22, color: 'black', textAlign:'center'}}>
              {name}
            </Text>
            <Text style={{fontSize: 16, color: 'black'}}>
              {email}
            </Text>
          </View>

          <TouchableOpacity 
            onPressOut={() => this.props.navigation.navigate('Logout')}
            style={{
              backgroundColor:'#583CAA',marginVertical:50,padding:20,alignSelf:'flex-start',borderTopRightRadius:35,
              borderBottomRightRadius:35, paddingRight:50
            }}>
            <Text style={{fontSize: 22, color: 'white', fontWeight:'bold'}}>
              Logout
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
  }
}

const MapStateToProps = state => ({
  email: state.users.data.email,
  name: state.users.data.name,
})

export default connect(
  MapStateToProps
  )(ProfileScreen)

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    ellipse: {
      // flex:1,
      width: 617,
      height: 617,
      marginTop: -370,
      alignSelf: "center",
      position:'absolute',
    },
    bottomcontainer: {
      flex:1,
      backgroundColor:'white'
    },
    btncontainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginRight:15
    },
    center: {
      justifyContent: 'center',
      flex:1,
      marginHorizontal:20,
      // backgroundColor:'rgba(0,0,0,0.5)'
    },
    profilecontainer: {
      flexDirection:'row',
      alignItems:'center',
      flex:2
    },
    menucontainer: {
      flex:3,
      // backgroundColor:'rgba(0,0,0,0)',
    },
    menu: {
      marginBottom:30,
      flexDirection:'row',
    },
  });
  