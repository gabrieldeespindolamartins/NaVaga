import { View, Text, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../theme/fonts";
import AppText from "../theme/AppText";
import Input from "../Components/Input";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#2F3B42',
        padding: 25,
    },
});

export default function Register({ navigation }) {
    return(
        <SafeAreaView style={styles.container}> 
            <AppText>Boas vindas ao NaVaga!</AppText>
            <View style={{height: 1, width: 350, backgroundColor: '#C2C9CD'}}></View>
            <Input 
            label="senha"
                placeholder="a"
            ></Input> 
            <Input 
            label="aushdiuas"
                placeholder="asnduashdui    "
            ></Input> 
        </SafeAreaView>
    );
}