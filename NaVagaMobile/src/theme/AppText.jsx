import { Text } from "react-native";
import { fonts } from "./fonts";

export default function AppText({style, ...props}) {
    return <Text {...props} style={[{ fontFamily: fonts.regular, color: '#FFFFFF', }, style]} />;
}