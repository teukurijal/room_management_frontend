import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Picker,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../service/baseUrl';
import { connect } from 'react-redux';
import * as actionCheckin from '../_actions/actionCheckin';
import Modal from 'react-native-modalbox';
import CountDown from 'react-native-countdown-component';
import theme from './style';


class RoomsScreen extends Component {
  constructor() {
    super();
    this.state = {
      position: 1,
      isRefreshing: false,
      countdown:'',
      duration:'',
      customer_name:'',
      customer_id:'',
      room_name:'',
      room_id:''
    };
  }

  componentDidMount = () => {
    console.log(this.props.token)
    this.requestData()
  };

  requestData() {
    this.props.getCheckin(this.props.token);
  };

  refreshData() {
    this.setState({isRefreshing: true})
    this.requestData()
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  };

  handleAutoCheckout = async (id) => {
    this.refs.checkout.close();
    await axiosInstance({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
      url: `/order/${id}`,
      data: {
        customer_id : null,
      }
    })
    this.refreshData();
  };

  handleAddCheckout = async () => {
    this.refs.checkout.close();
    await axiosInstance({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
      url: `/order/${this.state.room_id}`,
      data: {
        customer_id : null,
      }
    })
    this.refreshData();
  };

  handleAddCheckin = async () => {
    this.refs.checkin.close();
    await axiosInstance({
      method: 'POST',

      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${this.props.token}`,
      },
      url: `/checkin`,
      data: {
        room_id : this.state.room_id,
        customer_id : this.state.customer_id,
        duration : this.state.duration,
        order_end_time: "2019-10-21T02:29:32+00:00",
        is_done: false,
        is_booked : true
      }
    }).then( response => {
      this.setState({
        duration:'',
      })
    })
    this.refreshData();
  };


  handleCheckinOpen(id, name) {
    this.setState({
      room_name: name,
      room_id: id
    })
    this.refs.checkin.open()
  };


  handleCheckoutOpen(id, name, customer, time) {
    this.setState({
      room_name: name,
      room_id: id,
      customer_name: customer,
      countdown: time,
    })
    this.refs.checkout.open()
  };


  render() {

    const { checkin, customers } = this.props
    const numColumns = 3
    
    return (
      <View style={{flex: 1}}>
        <View>
        <ScrollView 
          scrollEventThrottle={0}
          showsVerticalScrollIndicator={false}
          refreshControl = {
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.refreshData()}
            />
          }
        >
          <View 
            style={{
              marginTop: 10,
              marginHorizontal:10
            }}>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
                <View style={{flexDirection:'row',justifyContent:"center", alignItems:'center',marginHorizontal:20}}>
                    <View style={styles.bookedinfo}></View>
                    <Text>Avaiable</Text>
                  </View>
                <View style={{flexDirection:'row',justifyContent:"center", alignItems:'center',marginHorizontal:20}}>
                  <View style={styles.availableinfo}></View>
                  <Text>Not available</Text>
                </View>
              </View>

              <FlatList
                data={checkin}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => 
                      item.customer ? 
                      this.handleCheckoutOpen(item.id, item.name, item.customer.name, item.order.duration) :
                      this.handleCheckinOpen(item.id, item.name)
                    }
                  >
                    <View
                      style={item.customer ? styles.booked : styles.available}>
                      {item.customer ?
                      <CountDown
                        until={(item.order.duration)*60
                        }
                        size={8}
                        onFinish={() => this.handleAutoCheckout(item.id)}
                        style={{marginTop:5, marginRight: 50,}}
                        digitStyle={{backgroundColor: '#FFF',}}
                        digitTxtStyle={{
                          // color: 'green',
                          color: theme.PRIMARY_COLOR,
                          fontSize:14
                        }}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: 'MM', s: 'SS'}}
                      /> : 
                      null
                      }
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
              />
          </View>
        </ScrollView>
        </View>
      <Modal
        ref={'checkout'}
        style={[styles.modal, styles.modal4]}
        position={'center'}>
        <View>
          <Text style={styles.text}>
            ---------- Checkout ----------
          </Text>
          <Text style={styles.text}>
            Room {this.state.room_name}
          </Text>
          <Text>Customer</Text>
          <Picker

              key={this.state.customer_id}
              enabled={false}
              selectedValue={this.state.customer_id}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({customer_id: itemValue})
              }>
               <Picker.Item label={this.state.customer_name} value='null' />
            </Picker>
          <Text> Durations Left (minute)</Text>
          <View 
            style={{
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              marginTop:15
            }}
          > 
            <View 
              style={{
                flexDirection:'row',
                marginHorizontal: 10,
                justifyContent:'space-around',
              }}  
            >
              <TouchableOpacity style={styles.btn} onPress={() => this.handleAddCheckout()}>
                <Text style={styles.textbtn}>Checkout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={()=> this.refs.checkout.close()}>
                <Text style={styles.textbtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        ref={'checkin'}
        style={[styles.modal, styles.modal4]}
        position={'center'}>
          <View style={styles.modalcenter}>
            <Text style={styles.text}>
              ------------ Checkin ------------
            </Text>
            <Text style={styles.text}>
              Room {this.state.room_name}
            </Text>
            <Text> Customer </Text>
            <Picker
              selectedValue={this.state.customer_id}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({customer_id: itemValue})
              }>
                <Picker.Item label="Choose Customer" value='0' />
                {
                  customers.map(item => {
                   return <Picker.Item label={item.name} value={item.id} />
                  })
                }
            </Picker>

            <Text> Durations(minute) </Text>
            <TextInput
            placeholder="input here"
            style={styles.textinput}
            onChangeText={(text) => this.setState({ duration: text})}
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
                <TouchableOpacity style={styles.btn} onPress={() => this.handleAddCheckin()}>
                  <Text style={styles.textbtn}>Checkin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() =>this.refs.checkin.close()}>
                  <Text style={styles.textbtn}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </View>
    );
  }
}
const mapStateToProps = state => ({
    token: state.users.data.token,
    rooms: state.rooms.data.room,
    checkin: state.checkin.data.data,
    customers: state.customers.data.room
  })

  const mapDispatchToProps = dispatch => {
    return {
      getCheckin: (token) => dispatch(actionCheckin.getCheckin(token)),
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
    height: 350,
    width: 330,
    borderRadius:30
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue'
  },
  text: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    marginBottom:5
  },
  image: {
    width: 100,
    height: 100,
    //borderRadius: 200 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius:10
  },
  textinput: {
    // height: 50, 
    // width: 200, 
    backgroundColor: '#DDDDDD',
    marginVertical:10,
    borderRadius:10
  },
  btn: {
    // backgroundColor:'#3a3a3a',
    backgroundColor: theme.PRIMARY_COLOR,
    marginHorizontal:20,
    paddingHorizontal:10,
    paddingVertical:5,
    // marginVertical:10,
    borderRadius:10
  },
  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  booked: {
    backgroundColor: '#d2d4d4',
    marginHorizontal:5,
    marginVertical:5,
    borderRadius:10,
    height:100,
    width:100,
    alignItems:'center'
  },
  available: {
    flex:1,
    // backgroundColor: 'green',
    backgroundColor: theme.PRIMARY_COLOR,
    marginHorizontal:5,
    marginVertical:5,
    borderRadius:10,
    height:100,
    width:100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalcenter: {
    // backgroundColor:'red',
    height:250,
    width:250
  },
  availableinfo: {
    backgroundColor: '#d2d4d4',
    marginHorizontal:5,
    marginVertical:5,
    borderRadius:2,
    height:20,
    width:20,
    alignItems:'center'
},
bookedinfo: {
  // backgroundColor: 'green',
  backgroundColor: theme.PRIMARY_COLOR,
  marginHorizontal:5,
  marginVertical:5,
  borderRadius:2,
  height:20,
  width:20,
  alignItems:'center'
}

});
