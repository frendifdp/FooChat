
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
        }
    }

    static navigationOptions = {
        title: 'Sign In',
        headerTitleStyle: {
            marginLeft: 10
        }
    }

    componentDidMount = () => {
    }
    
    onSubmit = () => {
        this.setState({modalVisible: true});
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Username"/>
                    <TextInput style={styles.input} placeholder="Password"/>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                        <Text style={{color: 'white'}}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 20}} onPress={() => {this.props.navigation.navigate('signUp')}}>
                        <Text style={{color: 'blue'}}>Sign Up</Text>
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

const styles = StyleSheet.create({
    row: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'green',
        width: '95%'
    },
    button : {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        backgroundColor: 'green',
        height: 50,
        borderRadius: 50
    },
    modal : {
        height: '100%',
        backgroundColor: '#00000050',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalCont: {
        backgroundColor: 'white',
        width: 200,
        height: 100,
        borderRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});