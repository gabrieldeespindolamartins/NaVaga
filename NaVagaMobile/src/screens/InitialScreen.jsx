import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    image: {
        height: 300
    }
})
export default function InitialScreen({ navigation }) {
    return(
        <View>  
            <Image
                style={styles.image}
                source={require('../../images/imageInitial.png')}
            />
            <Text>Bora dar um stop!</Text>
            <Text>Conheça a melhor forma de poupar tempo no trânsito.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>Cadastrar-se</TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>Já tenho uma conta</TouchableOpacity>
        </View>
    );
}