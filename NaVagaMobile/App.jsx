//npm i react-native-web @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack
//npx expo install expo-font @expo-google-fonts/montserrat

import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat'

import InitialScreen from './src/screens/InitialScreen.jsx';
import Login from './src/screens/Login.jsx';
import Register from './src/screens/Register.jsx';
import SplashScreen from "./src/screens/SplashScreen.jsx";
import Home from './src/screens/Home.jsx';
import Conta from './src/screens/Conta.jsx';
import Pesquisa from './src/screens/Pesquisa.jsx';
import Historico from './src/screens/Historico.jsx';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: "Montserrat_400Regular"}

const Stack = createNativeStackNavigator();

export default function App() {

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
    });

    if (!fontsLoaded) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen name="InitialScreen" component={InitialScreen}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Conta" component={Conta}/>
                <Stack.Screen name="Pesquisa" component={Pesquisa}/>
                <Stack.Screen name="Historico" component={Historico}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}