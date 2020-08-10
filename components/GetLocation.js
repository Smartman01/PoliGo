import React, { Component } from 'react';
import { Platform, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default class GetLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: null,
            reverseLocation: null,
            errorMsg: null
        }
    }

    async componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
            );
        } else {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    this.setState({
                        errorMsg: 'Permission to access location was denied'
                    })
                }

                let location = await Location.getCurrentPositionAsync({});

                let reverseLocation = await Location.reverseGeocodeAsync({ latitude: 29.518314, longitude: -81.259981 })

                this.setState({
                    location: location,
                    reverseLocation: reverseLocation[0]
                })

                console.log(location.coords.longitude);
                console.log(location.coords.latitude);
                console.log(reverseLocation[0]);
            })();
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

    render() { return (null) }
}