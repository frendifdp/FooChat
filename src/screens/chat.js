import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: props.navigation.getParam("name"),
            uid: props.navigation.getParam("uid"),
            myUid: '',
            myName: '',
            myAvatar: '',
            text: '',
            messagesList: []
        }
    }
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam("name", null),
        }
    }
    
    componentDidMount = async () => {
        this.setState({
            myUid: await AsyncStorage.getItem('myUid'),
            myName: await AsyncStorage.getItem('myName'),
            myAvatar: await AsyncStorage.getItem('myAvatar')
        })
        firebase.database().ref('messages').child(this.state.myUid).child(this.state.uid).on('child_added', (val)=>{
            this.setState((prevState)=>{
                return {
                    messagesList: GiftedChat.append(prevState.messagesList, val.val())
                }
            })
        })
    }

    

    sendMessage = async () => {
        if(this.state.text.length > 0){
            let msgId = firebase.database().ref('messages').child(this.state.myUid).child(this.state.uid).push().key;
            let updates = {};
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    _id: this.state.myUid,
                    name: this.state.myName,
                    avatar: this.state.myAvatar
                },
            }
            updates["messages/" + this.state.myUid + '/' + this.state.uid + '/' + msgId] = message;
            updates["messages/" + this.state.uid + '/' + this.state.myUid + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({text: ''})
            
        }
        else{
            alert('Please type a message first')
        }

    }

    render() {
        return (
            <GiftedChat
                text={this.state.text}
                messages={this.state.messagesList}
                user={{
                    _id : this.state.myUid
                }}
                onInputTextChanged={(text) => {this.setState({text: text})}}
                onSend={this.sendMessage}
            />
        );
    }
}