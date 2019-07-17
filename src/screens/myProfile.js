
import React, { Component } from 'react';
import { Image, Text, View, AsyncStorage, TouchableOpacity } from 'react-native';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
        }
    }

    static navigationOptions = {
        title: 'My Profile',
    }

    componentDidMount = async () => {
    }

    onLogout = async () => {
        let keys = ['myUid', 'myName', 'myAvatar'];
        await AsyncStorage.multiRemove(keys, (err) => {
            this.props.navigation.navigate('signIn')
            console.warn(err)
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image style={styles.photo} source={require('../../assets/images/logo.png')}/>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 35, marginTop: 20}}>Frendi Dwi P</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.box}>
                        <Text style={{color: 'black', fontSize: 15, marginTop: 10}}>frendifdp@gmail.com</Text>
                        <Text style={{color: 'black', fontSize: 15, marginTop: 10}}>Busy</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.logout} onPress={this.onLogout}>
                        <Text style={{color: 'black', fontSize: 25, marginTop: 10}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    photo: {
        height: 130,
        width: 130,
        marginTop: 10,
        borderRadius: 65
    },
    logout: {
        backgroundColor: 'pink',
        borderRadius: 3,
        elevation: 3,
        margin: 15,
        height: 50,
        alignItems: 'center',
    },
    box: {
        elevation: 3,
        height: 150,
        marginTop: 40,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        paddingLeft: 10,
    }
}