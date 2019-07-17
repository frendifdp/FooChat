import { createStackNavigator, createAppContainer } from "react-navigation";
import signIn from './src/screens/signIn';
import signUp from './src/screens/signUp';
import chat from './src/screens/chat';
import friendList from './src/screens/friendList';
import splash from './src/screens/splash';
import myProfile from './src/screens/myProfile';

const AppNavigator = createStackNavigator({
	splash: {
		screen: splash,
		navigationOptions : {
			header: null
		}
	},
  	signIn: {
		screen: signIn,
		navigationOptions : {
			header: null
		}
  	},
  	signUp: {
		screen: signUp,
		navigationOptions : {
			header: null
		}
	},
	friendList: {
		screen: friendList,
		navigationOptions : {
			header: null
		}
	},
	chat: {
		screen: chat
	},
	myProfile: {
		screen: myProfile
	}
});

const appContainer = createAppContainer(AppNavigator);
export default appContainer;