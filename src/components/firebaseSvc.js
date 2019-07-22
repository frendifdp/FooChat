//require('dotenv').config();
import firebase from 'firebase';
import config from '../../config/firebaseConfig'
import { AsyncStorage } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class FirebaseSvc {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    getLocation = () => {
        Geolocation.getCurrentPosition(info => {
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
        })
    }

    signIn = async (user, success_callback, failed_callback) => {
        await firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
        let userf = firebase.auth().currentUser;
        const updates = {}
        await AsyncStorage.setItem('myUid', userf.uid);
        await AsyncStorage.setItem('myName', userf.displayName);
        await AsyncStorage.setItem('myAvatar', userf.photoURL);
        Geolocation.getCurrentPosition(info => {
            updates['users/' + userf.uid + '/' + 'longitude'] = info.coords.longitude;
            updates['users/' + userf.uid + '/' + 'latitude'] = info.coords.latitude;
            firebase.database().ref().update(updates);
        }, err => {
            console.log(err)
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
        )
    }

    signUp = async (user) => {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(
                function () {
                    console.log(
                        'created user successfully. User email:' +
                        user.email +
                        ' name:' +
                        user.name
                    );
                    var userf = firebase.auth().currentUser;
                    userf.updateProfile({ displayName: user.name, photoURL: user.avatar }).then(
                        function () {

                            console.log('Updated displayName successfully. name:' + user.name);
                            alert(
                                'User ' + user.name + ' was created successfully. Please login.'
                            );
                            Geolocation.getCurrentPosition(info => {
                                firebase.database().ref('users/' + userf.uid).set({
                                    name: user.name,
                                    avatar: user.avatar,
                                    email: user.email,
                                    phone: user.phone,
                                    longitude: info.coords.longitude,
                                    latitude: info.coords.latitude
                                });
                            }, err => {
                                console.log(err)
                            },
                            {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
                            )                            
                        },
                        function (error) {
                            console.warn('Error update displayName.');
                        }
                    );
                },
                function (error) {
                    alert('Create account failed. Error: ' + error.message);
                }
            );
    };

}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;