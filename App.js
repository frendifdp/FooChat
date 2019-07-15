import { createStackNavigator, createAppContainer } from "react-navigation";
import signIn from './src/screens/signIn';
import signUp from './src/screens/signUp';

const AppNavigator = createStackNavigator({
  	signIn: {
    	screen: signIn,
  	},
  	signUp: {
    	screen: signUp,
	}
});

const appContainer = createAppContainer(AppNavigator);
export default appContainer;