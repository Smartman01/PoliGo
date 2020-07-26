import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, ActivityIndicator, AsyncStorage, FlatList } from 'react-native'
import Constants from 'expo-constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import stateVotingData from '../stateVotingData';
import stateObjects from '../stateObjects'

import api_key from '../../API_KEY'

class PrimaryElections extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            electionIDs: [],
            primaryElections: [],
            address: null,
            stateName: null
        }
    }
    electionUrl = `https://www.googleapis.com/civicinfo/v2/elections?key=${api_key}`

    async componentDidMount() {
        try {
            let address = await AsyncStorage.getItem('address')

            if (address !== null) {
                let stateName = address.split('%2c%20')[1].toUpperCase()
                stateName = stateObjects[stateName]

                this.setState({
                    address: address,
                    stateName: stateName
                })

                this.electionQuery()
            }
        } catch (err) {
            alert(err)
        }

    }

    electionQuery = () => {
        let req = new Request(this.electionUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = response.elections.filter(elem => {
                    return elem.name.includes(this.state.stateName)
                })

                let ids = []

                for (let i = 0; i < data.length; i++)
                    ids.push(data[i].id)

                this.setState({
                    electionIDs: ids
                })

                this.state.electionIDs.forEach(elem => {
                    this.voterInfoQuery(elem)
                })
            })
            .catch(console.log)
    }

    voterInfoQuery = (id) => {
        let voterInfoUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${this.state.address}&electionId=${id}&key=${api_key}`
        
        let req = new Request(voterInfoUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let election = response.state[0]
                election.electionID = response.election.id
                election.electionName = response.election.name
                election.electionDate = response.election.electionDay

                let data = [...this.state.primaryElections, election]

                this.setState({
                    primaryElections: data,
                    isLoading: false
                })
            })
            .catch(console.log)
    }

    changeHandler = (val) => {
        if (val.nativeEvent.text == "")
            return
        
        let address = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        let stateName = stateObjects[val.nativeEvent.text.split(', ')[1].toUpperCase()]

        this.setState({
            isLoading: true,
            address: address,
            stateName: stateName,
            primaryElections: []
        })

        this.electionQuery()
    }

    render() {
        return(
            <View style={styles.container}>
                {/* Searchbar */}
                <TextInput 
                    placeholder={'City, State'}
                    onSubmitEditing={(val) => this.changeHandler(val)} />
                { this.state.isLoading ? (
                    <>
                        <ActivityIndicator size='large'/>
                        <Text>If Loads forever there is no data</Text>
                    </>
                ) : (
                    <FlatList
                        data={this.state.primaryElections}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item.electionName}</Text>
                                <Text>{item.electionDate}</Text>
                                <Text>{item.electionAdministrationBody.name}</Text>
                                <Text>{item.electionAdministrationBody.votingLocationFinderUrl}</Text>
                                <Text>{item.electionAdministrationBody.electionInfoUrl}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.electionID}
                    />
                )}
            </View>
        )
    }
}

class GeneralElections extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            generalElections: [],
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

                this.voterInfo()
            }
        } catch (err) {
            alert(err)
        }
    }

    voterInfo = () => {
        let voterInfoUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${this.state.address}&electionId=2000&key=${api_key}`

        let req = new Request(voterInfoUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = response.contests

                data.map((elem, index) => {
                    elem.key = parseInt(Math.random() * 100000).toString()
                })

                this.setState({
                    generalElections: data,
                    isLoading: false
                })

                // console.log(this.state.generalElections);
                
            })
            .catch(console.log)
    }

    changeHandler = (val) => {
        if (val.nativeEvent.text == "")
            return
        
        let address = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        this.setState({
            isLoading: true,
            address: address,
            generalElections: []
        })

        this.voterInfo()
    }

    render() {
        return(
            <View style={styles.container}>
                {/* Searchbar */}
                <TextInput 
                    placeholder={'City, State'}
                    onSubmitEditing={(val) => this.changeHandler(val)} />
                { this.state.isLoading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={this.state.generalElections}
                        renderItem={({item}) => (
                            <View style={{margin: 10}}>
                                {/* Election type */}
                                <Text>Election type: {item.type}</Text>
                                {/* Office */}
                                { item.office !== undefined && <Text>Position: {item.office}</Text> }
                                <Text>District: {item.district.scope}</Text>
                                { item.candidates !== undefined && item.candidates.map((elem, key) => {
                                    return(
                                        <Text key={key}>{elem.name}</Text>
                                    )
                                })}
                            </View>
                        )}
                        keyExtractor={item => item.key}
                    />
                )}
            </View>
        )
    }
}

const Tab = createMaterialTopTabNavigator();

export default function VotingInfoScreen() {
    return(
        <Tab.Navigator style={{marginTop: Constants.statusBarHeight}}>
            <Tab.Screen name='General Elections' component={GeneralElections} />
            <Tab.Screen name='Primary Elections' component={PrimaryElections} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center'
    },
    input: {
        marginBottom: 10,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})

