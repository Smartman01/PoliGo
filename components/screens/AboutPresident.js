import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AboutPresident({ navigation, president }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <MaterialCommunityIcons name='backburger' size={24} color='black' style={styles.backButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Policies', {president})
            }}>
                <Text>Policies</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={{ alignItems: 'center', }}>
                    {/* President */}
                    <Text>{president.name}</Text>
                    <Image source={{ uri: president.imageUrl }} style={styles.image} />
                    <Text>Party: {president.party}</Text>
                    <Text>{president.description}</Text>
                    {/* Running Mate */}
                    {president.runningMate.name !== null ?
                        (<View>
                            <Text>RunningMate: {president.runningMate.name}</Text>
                            <Image source={{ uri: president.runningMate.imageUrl }} style={styles.image} />
                        </View>
                        ) : (<Text>No Running Mate Yet</Text>)
                    }
                    {/* Add Button and linking feature */}
                    <Text>Contact Info: {president.contactInfo.website}</Text>
                    {/* Display Social Media and linking feature */}
                    {/* Policies */}
                    {/* {Policies(president.name.split(' ')[1].toLowerCase())} */}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    content: {
        flex: 2,
        alignItems: "center",
    },
    backButton: {
        marginLeft: 10
    },
    image: {
        width: 250,
        height: 300,
        margin: 10
    }
})
