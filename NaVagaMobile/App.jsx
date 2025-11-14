//npm install react-native-web
//npm install @react-navigation/native
//npm install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack

import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InitialScreen from './src/screens/InitialScreen.jsx';
import Login from './src/screens/Login.jsx';
import Register from './src/screens/Register.jsx';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Initial">
                <Stack.Screen name="Initial" component={InitialScreen}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Login" component={Login}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}