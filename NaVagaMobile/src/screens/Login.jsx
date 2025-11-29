import { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../theme/fonts";
import AppText from "../theme/AppText";
import Input from "../Components/Input";
import { api } from "../services/api";

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

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin() {
        if (!email || !senha) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            const response = await api.post("/usuarios/login", { email, senha });

            alert("Login realizado!");

            // Aqui futuramente você pode salvar o token
            // AsyncStorage.setItem("token", response.data.token);

            navigation.replace("Home");

        } catch (err) {
            alert(err.response?.data?.error || "Erro ao fazer login");
        }
    }

    return(
        <SafeAreaView style={styles.container}> 
            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={{alignSelf: 'baseline', marginTop: 30, marginBottom: 5}}
            >
                <Image
                    style={{height: 30,width: 30 }}
                    source={require('../../images/back.png')}
                />
            </TouchableOpacity>

            <AppText style={styles.title}>Bem-vindo de volta!</AppText>

            <View style={{height: 1, width: "100%", backgroundColor: '#C2C9CD', margin: 15}}></View>

            <Input 
                label="Email"
                placeholder="seuemail@gmail.com"
                value={email}
                onChangeText={setEmail}
            /> 

            <Input 
                label="Senha"
                placeholder="********"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.continueButton}>
                <AppText style={styles.continueText}>Entrar</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                <AppText style={styles.loginText}>Criar conta</AppText>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
