import React from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';

import PresidentData from '../PresidentData';
import { ScrollView } from 'react-native-gesture-handler';

function Presidents(navigation) {
    return (
        <View>
            <FlatList
                data={PresidentData}
                numColumns={2}
                key={item => item.key}
                renderItem={({ item }) => (
                    <View style={item.party === 'Democratic' ? styles.democratic : styles.republican}>
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
        <View style={styles.container}>
            {/* Wrap in scrollview */}
            <ScrollView contentContainerStyle={{ alignItems: 'center', }}>
                <Text style={styles.appName}>PoliGo</Text>
                <Text style={styles.subTitle}>Politics on the Go</Text>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>2020 Presidential Election</Text>
                    <Text style={styles.body}>Presidential Candidates</Text>
                    {Presidents(navigation)}

                    {/* Pie Chart of Poll Numbers */}
                </View>
                {/* State voting info Button */}
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Voting Screen');
                }}>
                    <Text style={styles.body}>Voting Info Screen</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
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
        marginTop: 20
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