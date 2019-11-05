import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Svg, { Ellipse } from "react-native-svg";

class Header extends Component {
    render() {
        return (
        <View>
          <Svg viewBox="0 0 616.76 616.95" style={styles.ellipse}>
            <Ellipse
                strokeWidth={1}
                fill="rgba(88,60,170,1)"
                stroke="rgba(230, 230, 230,1)"
                cx={308}
                cy={200}
                rx={308}
                ry={200}
            />
          </Svg>
          <View style={{alignSelf:'center',marginVertical:30}}>
            <Text style={{fontSize:22, color:'white', fontWeight: 'bold'}}>{this.props.name}</Text>
          </View>
        </View>
        )
    }
}

export default Header;

const styles = StyleSheet.create({
  ellipse: {
    // flex:1,
    width: 617,		
    height: 617,
    marginTop: -320,
    alignSelf: "center",
    position:'absolute',
  },
})