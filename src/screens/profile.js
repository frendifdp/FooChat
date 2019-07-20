
import React, { Component } from 'react';
import { Image, Text, View, AsyncStorage, TouchableOpacity } from 'react-native';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            avatar: '',
            name: '',
            email: '',
            phone: ''
        }
    }

    static navigationOptions = {
        title: 'Profile',
    }

    componentDidMount = async () => {
        console.warn(this.props.navigation.getParam("name"))
        if (this.props.navigation.getParam("name") !== undefined) {
            this.setState({
                avatar: this.props.navigation.getParam("avatar"),
                name: this.props.navigation.getParam("name"),
                email: this.props.navigation.getParam("email"),
                phone: this.props.navigation.getParam("phone")
            })
        }
        else {
            this.setState({
                avatar: await AsyncStorage.getItem('myAvatar'),
                name: await AsyncStorage.getItem('myName')
            })
        }
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
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image style={styles.photo} source={{ uri: this.state.avatar }} />
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 35, marginTop: 20 }}>{this.state.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.box}>
                        <Text style={{ color: 'black', fontSize: 20, marginTop: 10 }}>{this.state.email}</Text>
                        <Text style={{ color: 'black', fontSize: 20, marginTop: 10 }}>{this.state.phone}</Text>
                    </View>
                </View>
                {(this.props.navigation.getParam("name") !== undefined) ?
                    <View>
                        <Text></Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.logout} onPress={this.onLogout}>
                            <Text style={{ color: 'black', fontSize: 25, marginTop: 10 }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                }
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