import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import stateVotingData from '../stateVotingData';
import { FlatList } from 'react-native-gesture-handler';

const api_key = 'AIzaSyCElhp5ZT45S4lHLnZRC-mmRs1c14uyzto';

class PrimaryElections extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            electionIDs: [],
            primaryElections: []
        }
    }

    address = 'Dallas%2C%20Texas'
    electionUrl = `https://www.googleapis.com/civicinfo/v2/elections?key=${api_key}`

    componentDidMount() {
        this.electionQuery()
    }

    electionQuery = () => {
        let req = new Request(this.electionUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = response.elections.filter(elem => {
                    // Remeber to change to state name
                    return elem.name.includes('Texas')
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
        let voterInfoUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${this.address}&electionId=${id}&key=${api_key}`
        
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

    render() {
        return(
            <View style={styles.container}>
                { this.state.isLoading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={this.state.primaryElections}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item.electionID}</Text>
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
            generalElections: []
        }
    }

    address = 'palm%20coast'

    voterInfoUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${this.address}&electionId=2000&key=${api_key}`

    componentDidMount() {
        this.voterInfo()
    }

    voterInfo = () => {
        let req = new Request(this.voterInfoUrl, {
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

    render() {
        return(
            <View style={styles.container}>
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

