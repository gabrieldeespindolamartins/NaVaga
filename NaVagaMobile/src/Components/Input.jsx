import { TextInput, Text} from "react-native";
import { View } from "react-native";

export default function Input({ label, placeholder, ...props }) {

    return(
        <View>
            <Text>{label}</Text>
            <TextInput
                placeholder={placeholder}
                {...props}
            />
        </View>
    );
}