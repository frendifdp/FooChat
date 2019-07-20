import React, { Component } from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Modal } from 'react-native';
import firebase from 'firebase'

export default class App extends Component{
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            email : '',
            password : '', 
            users: [],
            myUid: ''
        }
    }

    componentDidMount = async () => {
        this.setState({myUid: await AsyncStorage.getItem('myUid'), users: []})
        this.subs = [
			this.props.navigation.addListener('willFocus', () => {
				this.setState({users: []})
			})
		]
        await firebase.database().ref('users/').on('child_added', (value) =>{
            let person = value.val()
            person.uid = value.key
            if(person.uid !== this.state.myUid){
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
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
            <View>
                <View style={{marginLeft: 5, marginRight: 5}}>
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
        marginBottom: 5,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: 'lghtgrey',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    }
}