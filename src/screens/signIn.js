
import React, { Component } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import styles from '../../assets/styles'
import Firebase from '../../config/firebaseCfg';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            email : '',
            password : ''
        }
    }

    componentDidMount = () => {
    }
    
    onSubmit = async () => {
        this.setState({modalVisible: true});
        await Firebase.auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(this.setState({modalVisible: false}));

    }

    // login = async(user, success_callback, failed_callback) => {
    //     await firebase.auth()
    //       .signInWithEmailAndPassword(user.email, user.password)
    //     .then(success_callback, failed_callback);
    //  }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{...styles.row, marginTop: -150}}>
                    <Image style={{height: 125, width: 135}} source={require('../../assets/images/logo.png')}/>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 35, marginTop: 20}}>FooChat</Text>
                </View>
                <View style={styles.row}>
                    <TextInput onChangeText={(value) => {this.setState({email: value})}} style={styles.input} placeholder="Email"/>
                    <TextInput onChangeText={(value) => {this.setState({password: value})}} style={styles.input} placeholder="Password"/>
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
                    <TouchableOpacity style={styles.modal} onPress={() => {this.setState({modalVisible: false})}}>
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