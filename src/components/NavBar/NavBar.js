// import library to help create a component
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'

// create a component
class NavBar extends Component {
  render(){
    const styles = {
      viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 90,
        paddingBottom: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2,  },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
      },
      textStyle: {
        fontSize: 20
      }
    }
    const {textStyle, viewStyle} = styles

    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title style={textStyle}> Shef </Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='profile' />
          </Button>
        </Right>
      </Header>
    )
  }
}



// make component available to other parts of the app
export default NavBar
