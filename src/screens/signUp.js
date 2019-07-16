
import React, { Component } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, Picker, ActivityIndicator, Modal } from 'react-native';
import styles from '../../assets/styles'

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            gender: 1,
            modalVisible: false
        }
    }
    componentDidMount = () => {
    }
    // componentWillUnmount = () => {
    //   clearTimeout();
    // }
    onSubmit = () => {
        this.setState({modalVisible: true})
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        firebaseSvc.signUp(user);
    }

    render() {
        return (
            <View style={{flex: 1,  justifyContent: 'center'}}>
                <View style={{...styles.row, marginTop: -50}}>
                    <Image style={{height: 125, width: 135}} source={require('../../assets/images/logo.png')}/>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 35, marginTop: 20}}>FooChat</Text>
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Username"/>
                    <TextInput style={styles.input} placeholder="Email"/>
                    <Picker
                        style={{width: '100%', height: 50}}
                        selectedValue={this.state.gender}
                        onValueChange={(value, key) =>
							this.setState({gender: value})
						}
                    >
                        <Picker.Item label="Male" value={1}/>
                        <Picker.Item label="Female" value={2}/>
                    </Picker>
                    <TextInput style={styles.input} placeholder="Password"/>
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