import React from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, TextInput } from 'react-native'
import Constants from 'expo-constants';

export default function SettingsScreen() {
    const save = async (address) => {
        try {
            await AsyncStorage.setItem('address', address.replace(/ /g, '%20').replace(',', '%2C').toLowerCase())
            await AsyncStorage.setItem('UneditedAddress', address)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <View style={{marginTop: Constants.statusBarHeight}}>
            <Text>Settings</Text>
            <TextInput
                placeholder='Enter address'
                onSubmitEditing={(val) => {save(val.nativeEvent.text)}}
            />
            <TouchableOpacity onPress={async () => {
                try {
                    await AsyncStorage.removeItem('address');
                    await AsyncStorage.removeItem('UneditedAddress');
                } catch (err) {
                    alert(err)
                }
            }}>
                <Text>Delete Address</Text>
            </TouchableOpacity>
        </View>
    )
}
