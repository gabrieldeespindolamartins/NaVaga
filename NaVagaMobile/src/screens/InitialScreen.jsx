import { View, Text, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#2F3B42'
    },
    image: {
        height: 300
    },

    title: {
        color: '#FFFFFF',
    },

    paragraph: {
        color: '#FFFFFF',
    },
    
    registerButton: {
        
        justifyContent:'center',
        height: 45,
        width: '80%',
        borderRadius:10,
        
        backgroundColor: '#42BAFF',
        
    },
    registerText: {
        textAlign:'center',
        color: '#FFFFFF',
 
    },

    loginText: {
        color:'#42BAFF',
    },
})
export default function InitialScreen({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>  
            <Image
                style={styles.image}
                source={require('../../images/imageInitial.png')}
            />
            
            <Text style={styles.title}>Bora dar um stop!</Text>
            <Text style={styles.paragraph}>Conheça a melhor forma de poupar tempo no trânsito.</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
                <Text style={styles.registerText}>Cadastrar-se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                <Text style={styles.loginText}>Já tenho uma conta</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}