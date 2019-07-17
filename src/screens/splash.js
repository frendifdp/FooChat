
import React, { Component } from 'react';
import { Image, Text, View, AsyncStorage } from 'react-native';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount = async () => {
        const myUid = await AsyncStorage.getItem('myUid')
        setTimeout(()=>{
            if(myUid !== null){
                this.props.navigation.navigate('friendList')
            }
            else{
                this.props.navigation.navigate('signIn')
            }
        }, 2500)
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{height: 125, width: 135}} source={require('../../assets/images/logo.png')}/>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 35, marginTop: 20}}>FooChat</Text>
            </View>
        );
    }
}