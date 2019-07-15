
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker, ActivityIndicator, Modal } from 'react-native';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            gender: 1,
            modalVisible: false
        }
    }

    static navigationOptions = {
        title: 'Sign Up',
        headerTitleStyle: {
            marginLeft: -45
        },
        headerLeft: (
            <View></View>
        )
    }
    
    // handleNavigate = () => {
    //     const { navigation } = this.props;
    //     navigation.navigate('Note')
    // }
    componentDidMount = () => {
        // setInterval(() => {
        //     let count = this.state.counter;
        //     this.setState({
        //         counter: count + 1,
        //     })
        // }, 1000)
    }
    // componentWillUnmount = () => {
    //   clearTimeout();
    // }
    onSubmit = () => {
        this.setState({modalVisible: true});
    }

    render() {
        return (
            <View style={{flex: 1,  justifyContent: 'center'}}>
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
                    <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                        <Text style={{color: 'white'}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 20}} onPress={() => {this.props.navigation.navigate('signIn')}}>
                        <Text style={{color: 'green'}}>Sign In</Text>
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
        borderBottomColor: 'blue',
        width: '95%'
    },
    button : {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        backgroundColor: 'blue',
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
