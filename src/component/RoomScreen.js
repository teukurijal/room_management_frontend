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
} from 'react-native';
import axiosInstance from '../service/baseUrl';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import * as actionCustomers from '../_actions/actionCustomers';
import * as actionRooms from '../_actions/actionRooms';
import Modal from 'react-native-modalbox';
import theme from './style'


class RoomsScreen extends Component {
  constructor() {
    super();
    this.state = {
      position: 1,
      interval: null,
      disbaledbtn: true,
      isRefreshing: false,
      addroom:'',
      room_id:'',
      room_name:''
    };
  }

  componentDidMount = () => {
    console.log("atasan",this.props.rooms)
    this.requestData()
  };

  requestData() {
    this.props.getRooms(this.props.token);
    this.props.getCustomers(this.props.token);
  };

  refreshData() {
    this.setState({isRefreshing: true})
    this.requestData()
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  };

  handleAddRoom = async() => {
   
      this.refs.addmodal.close();
      await axiosInstance({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
        url: `/room`,
        data: {
          name: this.state.addroom,
        }
      }).then( response => {
        this.setState({
          addroom:'',
        })
      })
      this.refreshData()
  }

  handleEditRoom = async () => {
      await axiosInstance({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
        url: `/room/${this.state.room_id}`,
        data: {
          name: this.state.addroom
        }
      }).then( response => {
        this.setState({
          addroom:''
        })
      })
      this.refs.editmodal.close();
      this.refreshData();
  }

  handleOpenEditMOdal(id, name) {
    this.refs.editmodal.open()
    this.setState({
      room_id: id,
      room_name: name
    })
  }


  render() {
    const { rooms } = this.props
    const numColumns = 3
    return (
      <View style={{flex: 1}}>
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
              <FlatList
                data={rooms}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                
                  <TouchableOpacity
                  onPress={() => 
                    this.handleOpenEditMOdal(item.id, item.name)
                  }
                  >
                    <View
                      style={{
                        backgroundColor: '#d2d4d4',
                        marginHorizontal:5,
                        marginVertical:5,
                        borderRadius:10,
                        height:100,
                        width:100
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Text
                            style={{
                              fontSize: 22,
                              fontWeight: 'bold',
                            }}>
                            {item.name}
                          </Text>
                          
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumns}
              />
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
          color= {theme.PRIMARY_COLOR} 
          />
      </TouchableOpacity>
      <Modal
        ref={'addmodal'}
        style={[styles.modal, styles.modal4]}
        position={'center'}>
        <View>
          <Text style={styles.text}>
            Add Room
          </Text>
          <TextInput
            placeholder="Room Name"
            style={styles.textinput}
            onChangeText={(text) => this.setState({ addroom: text})}
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
              <TouchableOpacity style={styles.btn} onPress={()=> this.refs.addmodal.close()}>
                <Text style={styles.textbtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => this.handleAddRoom()}>
                <Text style={styles.textbtn}>Save</Text>
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
              Edit Room
            </Text>
            <TextInput
              placeholder="Room Name"
              editable={true}
              defaultValue={this.state.room_name}
              style={styles.textinput}
              onChangeText={(text) => this.setState({ addroom: text})}
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
                 <TouchableOpacity style={styles.btn} onPress={() =>this.refs.editmodal.close()}>
                  <Text style={styles.textbtn}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this.handleEditRoom()}>
                  <Text style={styles.textbtn}>Save</Text>
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
  rooms: state.rooms.data.room
})

  const mapDispatchToProps = dispatch => {
    return {
      getRooms: (token) => dispatch(actionRooms.getRooms(token)),
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
    borderRadius:10
  },

  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
