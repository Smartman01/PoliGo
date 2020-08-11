import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, AsyncStorage, TextInput } from 'react-native'
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

import PresidentData from '../data/PresidentData';
import PieChartData from '../data/PieChartData';
import GetLocation from '../GetLocation'

function Presidents(navigation) {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>PoliGo</Text>
            <Text style={styles.subTitle}>Politics on the Go</Text>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.container}>
                        <Text style={styles.title}>2020 Presidential Election</Text>
                        <Text style={styles.body}>Presidential Candidates</Text>
                    </View>
                }
                data={PresidentData}
                numColumns={2}
                key={item => item.key}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("About President", { item });
                        }}>
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                            <Text>{item.name}</Text>
                            <Text>Party: {item.party}</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("About President", { item });
                            }}>
                                <Text>Learn More</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                )}
                ListFooterComponent={
                    <>
                        {/* Pie Chart of Poll Numbers */}
                        <PieChartData />
                    </>
                }
            />
        </View>
    )
}

export default function PresidentScreen({ navigation }) {

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Raleway_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <>
            <GetLocation/>
            {Presidents(navigation)}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight
    },
    subContainer: {
        flex: 2,
        alignItems: 'center',
    },
    appName: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 40,
    },
    title: {
        fontFamily: 'Raleway_700Bold',
        fontSize: 30,
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: 'Raleway_400Regular',
        fontSize: 20
    },
    body: {
        fontFamily: 'Raleway_400Regular',
        fontSize: 30,
        textAlign: 'justify',
        marginTop: 20
    },
    republican: {
        backgroundColor: 'red'
    },
    democratic: {
        backgroundColor: 'blue'
    },
    image: {
        width: 150,
        height: 200,
        margin: 10,
    }
});