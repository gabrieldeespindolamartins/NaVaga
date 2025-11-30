import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../theme/AppText';
import { fonts } from '../theme/fonts';
import { api } from '../services/api';

export default function Historico({ navigation }) {
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // TODO: replace hardcoded usuarioId with logged user id when available
    const usuarioId = 1;

    useEffect(() => {
        const fetchHistorico = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/historico/${usuarioId}`);
                setHistorico(res.data || []);
            } catch (err) {
                console.error('Erro ao buscar histórico:', err.message || err);
                setError('Erro ao carregar histórico');
            } finally {
                setLoading(false);
            }
        };

        fetchHistorico();
    }, []);

    const renderItem = ({ item, index }) => {
        const isLatest = index === 0; // API returns ordered DESC by data_entrada
        const entrada = item.data_entrada ? new Date(item.data_entrada) : null;
        const saida = item.data_saida ? new Date(item.data_saida) : null;

        if (isLatest) {
            return (
                <View style={[styles.row, styles.rowHighlight]}>
                    <View style={styles.rowLeft}>
                        <Image source={require('../../images/compass.png')} style={styles.pin} />
                        <View style={styles.meta}>
                            <AppText style={[styles.title, styles.titleHighlight]}>{item.localizacao}</AppText>
                            <AppText style={styles.subtitle}>{entrada ? entrada.toLocaleString() : ''}</AppText>
                            <AppText style={styles.subtitle}>{saida ? `Saída: ${saida.toLocaleString()}` : ''}</AppText>
                        </View>
                    </View>
                    <AppText style={[styles.status, item.status === 'livre' ? styles.statusFree : styles.statusBusy]}>{item.status || ''}</AppText>
                </View>
            );
        }

        return (
            <View style={styles.rowSmall}>
                <View style={styles.rowLeftSmall}>
                    <Image source={require('../../images/compass.png')} style={[styles.pin, styles.pinSmall]} />
                    <View style={styles.metaSmall}>
                        <AppText style={styles.titleSmall}>{item.localizacao}</AppText>
                        <AppText style={styles.subtitleSmall}>{entrada ? entrada.toLocaleString() : ''}</AppText>
                    </View>
                </View>
                <AppText style={[styles.statusSmall, item.status === 'livre' ? styles.statusFree : styles.statusBusy]}>{item.status || ''}</AppText>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sheet}>
                <View style={styles.handle} />

                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={require('../../images/back.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <AppText style={styles.headerTitle}>Histórico</AppText>
                    <View style={{ width: 40 }} />
                </View>

                <FlatList
                    data={historico}
                    keyExtractor={item => String(item.id)}
                    contentContainerStyle={styles.list}
                    renderItem={renderItem}
                    ListEmptyComponent={<AppText style={styles.empty}>{loading ? 'Carregando...' : error || 'Nenhum histórico encontrado'}</AppText>}
                />

                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.navIcon} source={require('../../images/exploreOff.png')} />
                        <AppText style={styles.navText}>Explorar</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>
                        <Image style={styles.navIcon} source={require('../../images/historicOn.png')} />
                        <AppText style={[styles.navText, styles.navTextActive]}>Histórico</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Conta')}>
                        <Image style={styles.navIcon} source={require('../../images/contaOff.png')} />
                        <AppText style={styles.navText}>Conta</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#CDCDCD' },
    sheet: { flex: 1, backgroundColor: '#2F3B42', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingTop: 12, overflow: 'hidden' },
    handle: { width: 80, height: 6, backgroundColor: '#BCC7CA', borderRadius: 6, alignSelf: 'center', marginBottom: 8 },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 6 },
    backButton: { padding: 6 },
    backIcon: { width: 22, height: 22, tintColor: '#C2C9CD' },
    headerTitle: { color: '#C2C9CD', fontFamily: fonts.bold, fontSize: 20 },
    list: { paddingHorizontal: 12, paddingBottom: 12 },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#3F4B4F' },
    rowHighlight: { backgroundColor: '#39464E', borderRadius: 12, marginVertical: 6, paddingVertical: 16, paddingHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 4, elevation: 2 },
    rowLeft: { flexDirection: 'row', alignItems: 'center' },
    pin: { width: 20, height: 20, marginRight: 12, tintColor: '#BCC7CA' },
    meta: {},
    title: { color: '#FFFFFF', fontSize: 16, fontFamily: fonts.bold },
    titleHighlight: { color: '#42BAFF', fontSize: 18 },
    subtitle: { color: '#C2C9CD', fontSize: 12, fontFamily: fonts.regular },
    distance: { color: '#C2C9CD', fontFamily: fonts.regular },
    status: { fontFamily: fonts.bold, fontSize: 12 },
    statusFree: { color: '#6FD88A' },
    statusBusy: { color: '#D33B3B' },

    /* Small / less prominent rows */
    rowSmall: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 6, borderBottomWidth: 1, borderBottomColor: '#32393C', opacity: 0.85 },
    rowLeftSmall: { flexDirection: 'row', alignItems: 'center' },
    pinSmall: { width: 16, height: 16, marginRight: 10 },
    metaSmall: {},
    titleSmall: { color: '#C2C9CD', fontSize: 14, fontFamily: fonts.bold },
    subtitleSmall: { color: '#97A3A6', fontSize: 12, fontFamily: fonts.regular },
    statusSmall: { fontFamily: fonts.bold, fontSize: 11 },
    navContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, backgroundColor: '#2F3B42' },
    navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    navIcon: { width: 24, height: 24, marginBottom: 4 },
    navText: { fontSize: 12, color: '#C2C9CD', fontFamily: fonts.regular },
    navTextActive: { color: '#42BAFF', fontFamily: fonts.bold },
    empty: { color: '#C2C9CD', textAlign: 'center', marginTop: 20 }
});
