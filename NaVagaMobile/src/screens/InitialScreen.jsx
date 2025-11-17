import { Text, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "./theme/fonts";
import AppText from "./theme/AppText";



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#2F3B42',
        padding: 25,
    },
    g
    image: {
        height: 300
    },

    title: {
        color: '#FFFFFF',
        alignSelf: 'baseline',
        fontSize: 35,
        fontFamily: fonts.bold,
    },

    paragraph: {
        color: '#FFFFFF',
        fontSize: 20,
        marginBottom: 100,
    },
    
    registerButton: {
        justifyContent:'center',
        height: 50,
        width: '100%',
        borderRadius:10,
        backgroundColor: '#42BAFF',
    },
    
    registerText: {
        textAlign:'center',
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: fonts.bold,
    },

    loginText: {
        marginTop: 20,
        fontSize: 15,
        color:'#42BAFF',
        fontFamily: fonts.bold,
    },
})
export default function InitialScreen({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>  
            <Image
                style={styles.image}
                source={require('../../images/imageInitial.png')}
            />
            
            <AppText style={styles.title}>Bora dar um stop!</AppText>
            <AppText style={styles.paragraph}>Conheça a melhor forma de poupar tempo no trânsito.</AppText>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
                <AppText style={styles.registerText}>Cadastrar-se</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                <AppText style={styles.loginText}>Já tenho uma conta</AppText>
            </TouchableOpacity>

        </SafeAreaView>
    );
}