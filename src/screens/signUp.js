
import React, { Component } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, Picker, ActivityIndicator, Modal } from 'react-native';
import styles from '../../assets/styles'
import firebaseSvc from '../components/firebaseSvc';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            email : '',
            password : '',
            username: '',
            avatar: ''
        }
    }
    componentDidMount = () => {
    }
    // componentWillUnmount = () => {
    //   clearTimeout();
    // }
    onSubmit = async () => {
        this.setState({modalVisible: true})
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.username,
            avatar: this.state.avatar
        };
        await firebaseSvc.signUp(user);
        this.setState({modalVisible: false})
        this.props.navigation.navigate('signIn');
    }

    render() {
        return (
            <View style={{flex: 1,  justifyContent: 'center'}}>
                <View style={{...styles.row, marginTop: -50}}>
                    <Image style={{height: 125, width: 135}} source={require('../../assets/images/logo.png')}/>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 35, marginTop: 20}}>FooChat</Text>
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} onChangeText={(value) => {this.setState({avatar: value})}} placeholder="Image Url"/>
                    <TextInput style={styles.input} onChangeText={(value) => {this.setState({username: value})}} placeholder="Username"/>
                    <TextInput style={styles.input} onChangeText={(value) => {this.setState({email: value})}} placeholder="Email"/>
                    <TextInput style={styles.input} onChangeText={(value) => {this.setState({password: value})}} 
                    secureTextEntry={true}
                    placeholder="Password"/>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={{...styles.button, backgroundColor: 'blue'}} onPress={this.onSubmit}>
                        <Text style={{color: 'white'}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.button, backgroundColor: 'green', marginTop: 20}} onPress={() => {this.props.navigation.navigate('signIn')}}>
                        <Text style={{color: 'white'}}>Sign In</Text>
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