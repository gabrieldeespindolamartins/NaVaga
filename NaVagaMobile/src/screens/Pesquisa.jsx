import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../theme/AppText';
import { fonts } from '../theme/fonts';
import { api } from '../services/api';

// We'll fetch real vagas from API and display them

export default function Pesquisa({ navigation }) {
    const [query, setQuery] = useState('');
    const [vagas, setVagas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVagas = async () => {
            setLoading(true);
            try {
                const res = await api.get('/vagas');
                setVagas(res.data || []);
            } catch (err) {
                console.error('Erro ao buscar vagas:', err.message || err);
                setError('Erro ao carregar vagas');
            } finally {
                setLoading(false);
            }
        };

        fetchVagas();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sheet}>
                <View style={styles.handle} />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={require('../../images/back.png')} style={styles.backIcon} />
                    </TouchableOpacity>

                    <View style={styles.searchBox}>
                        <Image source={require('../../images/compass.png')} style={styles.locationIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Encontrar vagas"
                            placeholderTextColor="#C2C9CD"
                            value={query}
                            onChangeText={setQuery}
                            autoFocus
                        />
                    </View>

                    <TouchableOpacity onPress={() => { setQuery(''); navigation.goBack(); }} style={styles.cancelButton}>
                        <AppText style={styles.cancelText}>✕</AppText>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={query ? vagas.filter(v => (v.localizacao || '').toLowerCase().includes(query.toLowerCase())) : vagas}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <View style={styles.rowLeft}>
                                <Image source={require('../../images/compass.png')} style={styles.pin} />
                                <View style={styles.meta}>
                                    <AppText style={styles.title}>{item.localizacao || item.title}</AppText>
                                    <AppText style={styles.subtitle}>{item.endereco || item.subtitle || ''}</AppText>
                                </View>
                            </View>
                            <AppText style={styles.distance}>0 km</AppText>
                        </View>
                    )}
                />

                <View style={styles.navContainer}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.navIcon} source={require('../../images/exploreOff.png')} />
                        <AppText style={styles.navText}>Explorar</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                        <Image style={styles.navIcon} source={require('../../images/historicOff.png')} />
                        <AppText style={styles.navText}>Histórico</AppText>
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
    header: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: 'transparent' },
    backButton: { padding: 6, marginRight: 8 },
    backIcon: { width: 22, height: 22, tintColor: '#C2C9CD' },
    searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#334044', borderRadius: 10, paddingHorizontal: 10, height: 44 },
    locationIcon: { width: 18, height: 18, marginRight: 8, tintColor: '#C2C9CD' },
    input: { flex: 1, color: '#FFFFFF', fontFamily: fonts.regular, fontSize: 14 },
    cancelButton: { paddingHorizontal: 12 },
    cancelText: { color: '#C2C9CD', fontSize: 20, fontFamily: fonts.bold },
    list: { padding: 12 },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#3F4B4F' },
    rowLeft: { flexDirection: 'row', alignItems: 'center' },
    pin: { width: 20, height: 20, marginRight: 12, tintColor: '#BCC7CA' },
    meta: {},
    title: { color: '#FFFFFF', fontSize: 16, fontFamily: fonts.bold },
    subtitle: { color: '#C2C9CD', fontSize: 12, fontFamily: fonts.regular },
    distance: { color: '#C2C9CD', fontFamily: fonts.regular },
    navContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, backgroundColor: '#2F3B42' },
    navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    navIcon: { width: 24, height: 24, marginBottom: 4 },
    navText: { fontSize: 12, color: '#C2C9CD', fontFamily: fonts.regular }
});
