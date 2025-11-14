//npm i react-native-web @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack
//npx expo install expo-font @expo-google-fonts/montserrat

import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./src/Theme/ThemeProvider.jsx";

import InitialScreen from './src/screens/InitialScreen.jsx';
import Login from './src/screens/Login.jsx';
import Register from './src/screens/Register.jsx';


const Stack = createNativeStackNavigator();

export default function App() {
    
    const [fontsLoad] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
    });

    if (!fontsLoad) return null;

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.style = { fontFamily: "Montserrat_400Regular"}

    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Initial" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Initial" component={InitialScreen}/>
                    <Stack.Screen name="Register" component={Register}/>
                    <Stack.Screen name="Login" component={Login}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    )
}