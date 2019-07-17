import { createStackNavigator, createAppContainer } from "react-navigation";
import signIn from './src/screens/signIn';
import signUp from './src/screens/signUp';
import chat from './src/screens/chat';
import splash from './src/screens/splash';

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
	}
});

const appContainer = createAppContainer(AppNavigator);
export default appContainer;