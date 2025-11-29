import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../theme/fonts";
import AppText from "../theme/AppText";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CDCDCD',
        padding: 20,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3A4A54',
        borderRadius: 100,
        paddingHorizontal: 15,
        marginBottom: 10,
        paddingVertical: 10,
    },

    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: '#C2C9CD',
        fontFamily: fonts.regular,
        
        
    },

    iconButton: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },

    compassIcon: {
        width: 55,
        height: 55,
    },

    bottomSection: {
        backgroundColor: '#2F3B42',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        marginHorizontal: -20,
        marginBottom: -20,
    },

    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#39464E',
        borderRadius: 100,
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 55
        
    },

    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },

    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 8,
    },

    navItemExplorar: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 8,
    },

    navItemHistorico: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 8,
    },

    navItemConta: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 8,
    },

    navIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },

    navText: {
        fontSize: 12,
        color: '#C2C9CD',
        fontFamily: fonts.regular,
    },

    navTextActive: {
        color: '#42BAFF',
        fontFamily: fonts.bold,
    },

    contentArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    contentText: {
        fontSize: 18,
        color: '#C2C9CD',
        fontFamily: fonts.regular,
    },
});

export default function Home({ navigation }) {
    const [searchText, setSearchText] = useState("");
    const [activeTab, setActiveTab] = useState("explorar");

    return (
        <SafeAreaView style={styles.container}>
            {/* Content Area */}
            <View style={styles.contentArea}>
                <AppText style={styles.contentText}>Bem-vindo ao NaVaga!</AppText>
            </View>

            {/* Bottom Section with Search and Navigation */}
            <View style={styles.bottomSection}>
                {/* Search Bar with Compass */}
                <View style={styles.searchWrapper}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Encontre vagas"
                            placeholderTextColor="#8A9399"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        <TouchableOpacity>
                            <Image
                                style={styles.iconButton}
                                source={require('../../images/lupa.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Image
                            style={styles.compassIcon}
                            source={require('../../images/compass.png')}
                        />
                    </TouchableOpacity>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.navContainer}>
                    <TouchableOpacity 
                        style={styles.navItemExplorar}
                        onPress={() => setActiveTab("explorar")}
                    >
                        <Image
                            style={styles.navIcon}
                            source={activeTab === "explorar" ? require('../../images/exploreOn.png') : require('../../images/exploreOff.png')}
                        />
                        <AppText style={[styles.navText, activeTab === "explorar" && styles.navTextActive]}>
                            Explorar
                        </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.navItemHistorico}
                        onPress={() => setActiveTab("historico")}
                    >
                        <Image
                            style={styles.navIcon}
                            source={activeTab === "historico" ? require('../../images/historicOn.png') : require('../../images/historicOff.png')}
                        />
                        <AppText style={[styles.navText, activeTab === "historico" && styles.navTextActive]}>
                            Histórico
                        </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.navItemConta}
                        onPress={() => setActiveTab("conta")}
                    >
                        <Image
                            style={styles.navIcon}
                            source={activeTab === "conta" ? require('../../images/contaOn.png') : require('../../images/contaOff.png')}
                        />
                        <AppText style={[styles.navText, activeTab === "conta" && styles.navTextActive]}>
                            Conta
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}