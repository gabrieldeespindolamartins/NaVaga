import { View, Text, TouchableOpacity } from "react-native";

export default function InitialScreen({ navigation }) {
    return(
        <View>
            <Text>Tela Inicial</Text>
            <TouchableOpacity>Cadastrar</TouchableOpacity>
            <TouchableOpacity>Logar</TouchableOpacity>
        </View>
    );
}