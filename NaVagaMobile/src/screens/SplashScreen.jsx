import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Image, View } from "react-native";
import { useEffect } from "react";

export default function SplashScreen({ navigation }) {

    useEffect( ()=>{
    setTimeout(()=> navigation.replace('InitialScreen'), 3000)
    },[]);

    return (
        <SafeAreaView style={styles.container}>  


            <View style={styles.center}>
                <Image
                    style={styles.logo}
                    source={require('../../images/miniLogo.png')}
                />
            </View>

            <View style={styles.bottom}>
                <Image
                    style={styles.loading}
                    source={require('../../images/Loading.gif')}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#42BAFF',
        padding: 50,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottom: {
        alignItems: 'center',
        marginBottom: 20, // ajusta a distância do fundo
    },

    logo: {
        height: 160,
        width: 290,
    },

    loading: {
        height: 50,
        width: 50,
    },
});