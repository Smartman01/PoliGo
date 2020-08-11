import React, {useState} from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, TextInput } from 'react-native'
import Constants from 'expo-constants';

export default function SettingsScreen() {
    const [address, setAddress] = useState('')

    const load = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('userAddress')
            let addressObj = null

            if (jsonValue != null)
                addressObj = JSON.parse(jsonValue)
            
            setAddress(addressObj.UneditedAddress)
        } catch (err) {
            alert(err)
        }
    }

    load()

    return (
        <View style={{marginTop: Constants.statusBarHeight}}>
            <Text>Settings</Text>
            <Text>Address: {address}</Text>
        </View>
    )
}
