import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../theme/AppText";
import { fonts } from "../theme/fonts";

export default function Conta({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.flexGrow} />

            <View style={styles.bottomSheet}>
                <View style={styles.handle} />

                <View style={styles.headerRow}>
                    <View style={styles.nameWrapper}>
                        <AppText style={styles.nameText}>Nome de Usuário</AppText>
                    </View>

                    <View style={styles.avatarWrapper}>
                        <Image source={require('../../images/perfil.png')} style={styles.avatar} />
                    </View>
                </View>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.logoutRow} onPress={() => navigation.navigate('InitialScreen')}>
                    <Image source={require('../../images/logout.png')} style={styles.logoutIcon} />
                    <AppText style={styles.logoutText}>Sair</AppText>
                </TouchableOpacity>

                {/* Bottom Navigation (same layout as Home) */}
                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.navIcon} source={require('../../images/exploreOff.png')} />
                        <AppText style={styles.navText}>Explorar</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.navIcon} source={require('../../images/historicOff.png')} />
                        <AppText style={styles.navText}>Histórico</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>
                        <Image style={styles.navIcon} source={require('../../images/contaOn.png')} />
                        <AppText style={[styles.navText, styles.navTextActive]}>Conta</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CDCDCD',
    },
    flexGrow: { flex: 1 },
    bottomSheet: {
        backgroundColor: '#2F3B42',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
        overflow: 'hidden',
    },
    handle: {
        width: 80,
        height: 6,
        backgroundColor: '#BCC7CA',
        borderRadius: 6,
        alignSelf: 'center',
        marginBottom: 12,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameWrapper: {
        flex: 1,
        paddingRight: 12,
    },
    nameText: {
        fontSize: 28,
        color: '#FFFFFF',
        fontFamily: fonts.bold,
    },
    avatarWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#D9E0E3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    divider: {
        height: 1,
        backgroundColor: '#8FA6AB',
        marginVertical: 12,
    },
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    logoutIcon: {
        width: 20,
        height: 20,
        tintColor: '#D33B3B',
        marginRight: 8,
    },
    logoutText: {
        color: '#D33B3B',
        fontSize: 16,
        fontFamily: fonts.regular,
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
});
