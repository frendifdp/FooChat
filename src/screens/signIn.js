
import React, { Component } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal, AsyncStorage } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import styles from '../../assets/styles';
import firebaseSvc from '../components/firebaseSvc';
import friendList from './userList';

class App extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            email : '',
            password : ''
        }
    }

    componentDidMount = async () => {
        const myUid = await AsyncStorage.getItem('myUid')
        if(myUid !== null){
            this.props.navigation.navigate('maps')
        }
        this.subs = [
			this.props.navigation.addListener('willFocus', () => {
				this.forceUpdate()
			})
		]
    }
    
    onSubmit = async () => {
        this.setState({modalVisible: true})
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        await firebaseSvc.signIn(user, this.loginSuccess, this.loginFailed);
    }

    loginSuccess = async () => {
        console.warn('login successful, navigate to chat.')
        this.setState({modalVisible: false})
        this.props.navigation.navigate('maps');
    };

    loginFailed = () => {
        alert('Login failure. Please tried again.')
        this.setState({modalVisible: false})
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{...styles.row, marginTop: -150}}>
                    <Image style={{height: 125, width: 135}} source={require('../../assets/images/logo.png')}/>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 35, marginTop: 20}}>FooChat</Text>
                </View>
                <View style={styles.row}>
                    <TextInput onChangeText={(value) => {this.setState({email: value})}} style={styles.input} placeholder="Email"/>
                    <TextInput onChangeText={(value) => {this.setState({password: value})}}
                    style={styles.input} secureTextEntry={true} placeholder="Password"/>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={{...styles.button, backgroundColor: 'green'}} onPress={this.onSubmit}>
                        <Text style={{color: 'white'}}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.button, backgroundColor: 'blue', marginTop: 20}} onPress={() => {this.props.navigation.navigate('signUp')}}>
                        <Text style={{color: 'white'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                >
                    <TouchableOpacity style={styles.modal}>
                        <View style={styles.modalCont}>
                            <Text style={{marginBottom: 20}}>Processing</Text>
                            <ActivityIndicator size="large" color="green" />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}


const AppNavigator = createStackNavigator({
    signIn: {
        screen: App,
        navigationOptions : {
			header: null
		}
    },
    friendList: {
        screen: friendList,
        navigationOptions : {
			header: null
		}
    }
});

export default AppNavigator;