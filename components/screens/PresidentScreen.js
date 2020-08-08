import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, AsyncStorage, TextInput } from 'react-native'
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

import PresidentData from '../PresidentData';
import PieChartData from '../PieChartData';

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

class Popup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: null
        }
    }

    async componentDidMount() {
        try {
            let address = await AsyncStorage.getItem('address')

            if (address !== null) {
                this.setState({
                    address: address
                })
            }
        } catch (err) {
            alert(err)
        }
    }

    save = async (address) => {
        try {
            await AsyncStorage.setItem('address', address.replace(/ /g, '%20').replace(',', '%2C').toLowerCase())
            await AsyncStorage.setItem('UneditedAddress', address)
        } catch (err) {
            alert(err)
        }
    }

    render() {
        return(
            <Modal visible={this.state.address === null}>
                <ModalContent>
                    <Text>State must be the state code. Ex: Florida = FL</Text>
                    <TextInput 
                        placeholder={'Please enter your City, State'}
                        onSubmitEditing={(val) => {
                            this.setState({
                                address: val.nativeEvent.text
                            })

                            this.save(val.nativeEvent.text)
                        }}
                    />
                </ModalContent>
            </Modal>
        )
    }
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
            <Popup />
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