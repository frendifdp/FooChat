import React, { Component } from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native';
//import firebaseSvc from '../components/firebaseSvc';
import firebase from 'firebase'

export default class App extends Component{
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            email : '',
            password : '', 
            users: [],
            me: '',
            myUid: ''
        }
    }

    myProfile = () => {
		this.props.navigation.navigate('myProfile')
	};
    // onSubmit = () => {
    //     const a = firebaseSvc.readUserData
    //     console.warn(a)
    //     //this.props.navigation.navigate('signIn')
    // }

    getFriend = async () => {
        this.setState({myUid: await AsyncStorage.getItem('myUid')})
        await firebase.database().ref('users/').on('child_added', (value) =>{
            let person = value.val()
            person.uid = value.key
            if(person.uid === this.state.myUid){
                // this.setState({me: person.name})
            }
            else{
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        });
    }

    componentDidMount = async () => {
        await this.getFriend;
		this.subs = [
			this.props.navigation.addListener('willFocus', () => {
				await this.getFriend
			})
		]
    }

    renderItem = ({item}) => (
        <TouchableOpacity style={styles.user}
		onPress={() => this.props.navigation.navigate('chat', item)}
		>
	      	<Text style={{marginLeft: 5, marginTop: 12}}>{item.name}</Text>
	    </TouchableOpacity>
    )

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 25, marginTop: 25}}>Friend List</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{marginRight: -320, marginTop: -25}} onPress={() => {this.props.navigation.navigate('myProfile')}}>
                            <Text style={{fontSize: 25, color: 'black'}}>P</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:50, marginLeft: 5, marginRight: 5}}>
                    
                    <FlatList
                        data={this.state.users}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.uid}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    user: {
        height: 45,
        backgroundColor: 'lightblue',
        marginBottom: 5,
        borderRadius: 5,
        elevation: 3
    },
    header: {
        height: 50,
        elevation: 4,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'white'
    }
}