//require('dotenv').config();
import firebase from 'firebase';
import config from '../../config/firebaseConfig'
import { AsyncStorage } from 'react-native';

class FirebaseSvc {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    signIn = async (user, success_callback, failed_callback) => {
        await firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
        .then(success_callback, failed_callback);
        await AsyncStorage.setItem('myUid', firebase.auth().currentUser.uid);
    }

    signUp = async (user) => {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(
                function() {
                console.log(
                    'created user successfully. User email:' +
                    user.email +
                    ' name:' +
                    user.name
                );
                var userf = firebase.auth().currentUser;
                userf.updateProfile({ displayName: user.name }).then(
                    function() {
                        
                        console.log('Updated displayName successfully. name:' + user.name);
                        alert(
                            'User ' + user.name + ' was created successfully. Please login.'
                        );
                        firebase.database().ref('users/' + userf.uid).set({...user});
                    },
                    function(error) {
                        console.warn('Error update displayName.');
                    }
                );
            },
            function(error) {
                alert('Create account failed. Error: ' + error.message);
            }
        );
    };
    
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;