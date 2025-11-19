import { View, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../theme/fonts";
import AppText from "../theme/AppText";
import Input from "../Components/Input";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'flex-start',
        backgroundColor: '#2F3B42',
        padding: 25,
    },

    title: {
        fontFamily: fonts.bold,
        fontSize: 40,
        marginTop: 15,
    },

    continueButton: {
        margin: 25,
        justifyContent:'center',
        height: 45,
        width: '100%',
        borderRadius:10,
        backgroundColor: '#495963',
    },
    
    continueText: {
        textAlign:'center',
        fontSize: 16,
        fontFamily: fonts.bold,
        color: '#C2C9CD',
    },

    loginText: {
        fontSize: 15,
        color:'#42BAFF',
        fontFamily: fonts.bold,
    },
});

export default function Register({ navigation }) {
    return(
        <SafeAreaView style={styles.container}> 
            <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{alignSelf: 'baseline', marginTop: 30, marginBottom: 5}}>
                <Image
                    style={{height: 30,width: 30, }}
                    source={require('../../images/back.png')}
                />
            </TouchableOpacity>

           
            <AppText style={styles.title}>Boas vindas ao NaVaga!</AppText>

            <View style={{height: 1, width: "100%", backgroundColor: '#C2C9CD', margin: 15}}></View>

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

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.continueButton}>
                            <AppText style={styles.continueText}>Continuar</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                            <AppText style={styles.loginText}>Já tenho uma conta</AppText>
                        </TouchableOpacity>
        </SafeAreaView>
    );
}