import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axiosInstance from '../service/baseUrl';

import { connect } from 'react-redux';
import * as actionCustomers from '../_actions/actionCustomers';
import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-picker';
import theme from './style'

const options = {
  title: 'Select Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class RoomsScreen extends Component {
  constructor() {
    super();
    this.state = {
      photo:'',
      position: 1,
      interval: null,
      disbaledbtn: true,
      isRefreshing: false,
      id_customer:'',
      name:'',
      identitynumber:'',
      phonenumber:''
    };
  }

  componentDidMount = () => {
    // console.log("atasan",this.props.customers)
    this.requestData()
  };

  requestData() {
    this.props.getCustomers(this.props.token);
  };

  refreshData() {
    this.setState({isRefreshing: true})
    this.requestData()
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  };

  handleAddCustomer = async() => {
      this.refs.addmodal.close();
      await axiosInstance({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
        url: `/customer`,
        data: {
          name: this.state.name,
          identity_number: this.state.identitynumber,
          phone_number: this.state.phonenumber
        }
      }).then( response => {
        this.setState({
          name:'',
          identitynumber:'',
          phonenumber:''
        })
      })
      this.refreshData()
    

  }

  handleEditCustomer = async () => {
      await axiosInstance({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
        url: `/customer/${this.state.id_customer}`,
        data: {
          name: this.state.name,
          identity_number: this.state.identitynumber,
          phone_number: this.state.phonenumber,
          image:'',
        }
      }).then( response => {
        this.setState({
          name:'',
          identitynumber:'',
          phonenumber:'',
          id_customer:''
        })
      })
      this.refs.editmodal.close();
      this.refreshData();
  }

  handleOpenEditModal(id, name, identity, phone) {
    console.log(id)
    this.refs.editmodal.open()
    this.setState({
      id_customer: id,
      name: name,
      identitynumber: identity,
      phonenumber: phone
    })
  }

  handleChoosePhoto () {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }


  stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 6)) & 0xaf;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  };

  getInitials = function (string) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  render() {
    const { customers } = this.props
    const { photo } = this.state
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView 
          scrollEventThrottle={0}
          refreshControl = {
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.refreshData()}
          />
          }
        >
            <View style={{flex: 3}}>
              <View 
                style={{
                  marginTop: 15,
                  marginHorizontal:10,
                }}>
                <SafeAreaView>
                  <FlatList
                    data={customers}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <TouchableOpacity
                      onPress={() => 
                        this.handleOpenEditModal(
                          item.id, 
                          item.name, 
                          item.identity_number, 
                          item.phone_number
                          )}
                      >
                        <View
                          style={{
                            // backgroundColor: 'rgba(88,60,170,0.2)',
                            // elevation:1,
                            // borderWidth: 0.8,
                            borderColor: '#ADADAD',
                            flex: 1,
                            flexDirection: 'row',
                            borderRadius: 10,
                            marginHorizontal:5,
                            marginVertical:5,
                          }}
                          >
                          <View
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius:140/2,
                            backgroundColor: this.stringToColour(item.name),
                            alignItems:'center',
                            justifyContent:'center'
                          }}
                          >
                            <Text style={{fontSize:22, color:'white'}}>{this.getInitials(item.name)}</Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginHorizontal: 10,
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontSize: 17,
                                }}>
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color:'rgba(0,0,0,0.7)',
                                }}>
                                ID: {item.identity_number}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color:'rgba(0,0,0,0.7)'
                                }}>
                                Phone: {item.phone_number}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </SafeAreaView>
              </View>
            </View>
        </ScrollView>
        <TouchableOpacity
        onPress={() =>  this.refs.addmodal.open()}
        style={{
          backgroundColor:'none', 
          position: 'absolute',
          width: 60,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          right: 20,
          bottom: 20,
          }}>
          <Icon name="pluscircle" size={50} 
          // color='#3a3a3a'
          color={theme.PRIMARY_COLOR}
           />
        </TouchableOpacity>
      <Modal
        ref={'addmodal'}
        style={[styles.modal, styles.modal4]}
        position={'center'}>
        <View>
          <Text style={styles.text}>
            Add customer
          </Text>
          <TextInput
            placeholder="Name"
            style={styles.textinput}
            onChangeText={(text) => this.setState({ name: text})}
          />
            <TextInput
            placeholder="Identity Number"
            style={styles.textinput}
            onChangeText={(text) => this.setState({ identitynumber: text})}
          />
            <TextInput
            placeholder="Phone Number"
            style={styles.textinput}
            onChangeText={(text) => this.setState({ phonenumber: text})}
          />
          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
            <Image
              style={styles.image}
              source={{ uri: this.state.photo.uri }}
            />
            <TouchableOpacity style={styles.btnimage} onPress={() => this.handleChoosePhoto()}>
              <Text style={styles.textbtn}>Add ID Card</Text>
            </TouchableOpacity>
          </View>

          <View 
            style={{
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              marginTop:15
            }}> 
            <View 
              style={{
                flexDirection:'row',
                marginHorizontal: 10,
                justifyContent:'space-around',
              }}  
            >
              <TouchableOpacity style={styles.btn} onPress={()=> this.refs.addmodal.close()}>
                <Text style={styles.textbtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => this.handleAddCustomer()}>
                <Text style={styles.textbtn}> Save </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
          ref={'editmodal'}
          style={[styles.modal, styles.modal4]}
          position={'center'}>
          <View>
            <Text style={styles.text}>
              Edit Customer
            </Text>
            <TextInput
              placeholder="Name"
              editable={true}
              defaultValue={this.state.name}
              style={styles.textinput}
              onChangeText={(text) => this.setState({ name: text})}
            />
            <TextInput
              placeholder="Identity Number"
              editable={true}
              defaultValue={this.state.identitynumber}
              style={styles.textinput}
              onChangeText={(text) => this.setState({ identitynumber: text})}
            />
            <TextInput
              placeholder="Phone Number"
              editable={true}
              defaultValue={this.state.phonenumber}
              style={styles.textinput}
              onChangeText={(text) => this.setState({ phonenumber: text})}
            />
            <View 
              style={{
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                marginTop:15
              }}> 
             
              <View 
                style={{
                  flexDirection:'row',
                  marginHorizontal: 10,
                  justifyContent:'space-around',
                }}  
              >
                <TouchableOpacity style={styles.btn} onPress={() => this.refs.editmodal.close()}>
                  <Text style={styles.textbtn}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this.handleEditCustomer()}>
                  <Text style={styles.textbtn}>Save</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </Modal>

    </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
    token: state.users.data.token,
    customers: state.customers.data.room
  })

  const mapDispatchToProps = dispatch => {
    return {
      getCustomers: (token) => dispatch(actionCustomers.getCustomers(token)),
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(RoomsScreen);

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    height: 240,
  },
  modal4: {
    height: 280,
    width:330,
    borderRadius:30
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  textinput: {
    // height: 50, 
    // width: 200, 
    backgroundColor: '#DDDDDD',
    marginTop:10,
    borderRadius:10
  },
  btn: {
    // backgroundColor:'#3a3a3a',
    backgroundColor: theme.PRIMARY_COLOR,
    marginHorizontal:20,
    paddingHorizontal:10,
    paddingVertical:5,
    // marginVertical:10,
    borderRadius:5
  },
  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    // justifyContent:'center'
  },
  image: {
    width: 100,
    height: 100,
    //borderRadius: 200 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:10,
    marginTop:10
  },
  btnimage: {
    // backgroundColor:'#3a3a3a',
    backgroundColor: theme.PRIMARY_COLOR,
    marginVertical:30,
    alignSelf:'center',
    marginHorizontal:20,
    paddingHorizontal:10,
    paddingVertical:8,
    borderRadius:5,
  },

});
