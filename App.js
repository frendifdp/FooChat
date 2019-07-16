import { createStackNavigator, createAppContainer } from "react-navigation";
import signIn from './src/screens/signIn';
import signUp from './src/screens/signUp';

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
	}
});

const appContainer = createAppContainer(AppNavigator);
export default appContainer;