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
    title: {
        fontFamily: fonts.bold,
        fontSize: 35,
        margin: 10,
    },
});

export default function Register({ navigation }) {
    return(
        <SafeAreaView style={styles.container}> 
            <Image
                style={{height: 40,width: 40, alignSelf: 'baseline', margin: 10}}
                source={require('../../images/back.png')}
            />

           
            <AppText style={styles.title}>Boas vindas ao NaVaga!</AppText>
            <View style={{height: 1, width: "100%", backgroundColor: '#C2C9CD'}}></View>
            <Input 
            label="Seu nome de usuário"
                placeholder="Nome de usuário"
            ></Input> 
            <Input 
            label="Seu endereço de email"
                placeholder="seuemail@gmail.com"
            ></Input>
            <Input 
            label="Sua senha"
                placeholder="********"
            ></Input>
            <Input 
            label="Confirme sua senha"
                placeholder="********"
            ></Input> 
        </SafeAreaView>
    );
}