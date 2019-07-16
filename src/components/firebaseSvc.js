//require('dotenv').config();
import firebase from 'firebase';
import config from '../../config/firebaseConfig'
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
        
    }

    signUp = async (user) => {
        firebase
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
                    },
                    function(error) {
                        console.warn('Error update displayName.');
                    }
                );
            },
            function(error) {
                console.error('got error:' + typeof error + ' string:' + error.message);
                alert('Create account failed. Error: ' + error.message);
            }
        );
    };
    
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;