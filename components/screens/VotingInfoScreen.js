import React, { Component, useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import stateVotingData from '../stateVotingData';

export default class VotingInfoScreen extends Component {

    onNavigationStateChange = navState => {
        if (navState.url.indexOf('https://www.google.com') === 0) {
            const regex = /#access_token=(.+)/;
            let accessToken = navState.url.match(regex)[1];
            console.log(accessToken);
        }
    };

    state = {
        stateName: ''
    }

    changeHandler = (val) => {
        const ifState = stateVotingData.find(({ state }) => state == val.nativeEvent.text)

        if (ifState !== undefined)
            this.setState({
                stateName: val.nativeEvent.text
            })
        else
            this.setState({
                stateName: ''
            })
    }

    render() {
        const stateObj = stateVotingData.find(({ state }) => state == this.state.stateName)

        const web = this.state.stateName ? (
            <WebView
                source={{
                    uri: stateObj.website,
                }}
                onNavigationStateChange={this.onNavigationStateChange}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{ flex: 1, marginTop: 24 }}
            />
        ) : (
                <View>
                    <Text>Hello Please Wait</Text>
                </View>
            )

        return (
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack();
                }}>
                    <MaterialCommunityIcons name='backburger' size={24} color='black' style={styles.backButton} />
                </TouchableOpacity>
                {/* Title: State Voting Info */}
                <Text>State Voting Information</Text>
                {/* input state */}
                <TextInput
                    style={styles.input}
                    placeholder='Type in your state'
                    onSubmitEditing={this.changeHandler}
                />
                {/* Webview */}
                {web}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    input: {
        marginBottom: 10,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})

