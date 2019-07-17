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
            me: ''
        }
    }

    static navigationOptions = {
        title: 'Friend List'
    }

    // onSubmit = () => {
    //     const a = firebaseSvc.readUserData
    //     console.warn(a)
    //     //this.props.navigation.navigate('signIn')
    // }

    componentDidMount = async () => {
        this.setState({myUid: await AsyncStorage.getItem('myUid')})
        await firebase.database().ref('users/').on('child_added', (users) =>{
            let person = users.val()
            person.uid = users.key
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
            // this.setState((prevState) => {
            //     return {
            //         users: [...prevState.users, person]
            //     }
            // })
        });
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
            <View style={{marginLeft: 5, marginRight: 5}}>
                <FlatList
					data={this.state.users}
					renderItem={this.renderItem}
					keyExtractor={(item) => item.uid}
				/>
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
    }
}