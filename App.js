import { createStackNavigator, createAppContainer } from "react-navigation";
import signIn from './src/screens/signIn';
import signUp from './src/screens/signUp';
import chat from './src/screens/chat';
import friendList from './src/screens/friendList';

const AppNavigator = createStackNavigator({
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
		screen: friendList
	},
	chat: {
		screen: chat
	}
	
});

const appContainer = createAppContainer(AppNavigator);
export default appContainer;