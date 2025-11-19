import { TextInput, Text, StyleSheet} from "react-native";
import { View } from "react-native";

export default function InputRegister({ label, placeholder, ...props }) {

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 10
    },

    label:{
        color: '#DDE7ED',
        fontSize: 16,
        margin: 2
        
    },
    input: {
        paddingLeft: 20,
        backgroundColor: '#39464E',
        color: '#6C7A82',
        height: 45,
        borderRadius: 10,
        
    }
});