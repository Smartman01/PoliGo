import React, { Component } from 'react'
import { Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import Constants from 'expo-constants'
import CheckBox from '@react-native-community/checkbox';
import { add } from 'react-native-reanimated';

const api_key = 'AIzaSyCElhp5ZT45S4lHLnZRC-mmRs1c14uyzto';

// parsing out division IDs
var federal_pattern = "ocd-division/country:us";
var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
var local_pattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;


export default class OfficalsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            // address: null,
            federal: true,
            state: true,
            county: true,
            local: true,
            officicalsData: [],
            officesData: []
        }
    }

    findOfficialRole = () => {
        let { officicalsData, officesData } = this.state

        let foundRole = 0, i = 0, j = 0, k = 0;

        for (i = 0; i < Object.keys(officicalsData[0]).length; i++) {
            for (j = 0; j < Object.keys(officesData[0]).length; j++) {
                foundRole = 0;

                for (k = 0; k < officesData[0][j].officialIndices.length; k++) {
                    if (i === officesData[0][j].officialIndices[k]) {
                        officicalsData[0][i].role = officesData[0][j].name;

                        console.log(officicalsData[0][i])

                        foundRole = 1;
                        break;
                    }
                }

                if (foundRole)
                    break;
            }
        }
    }

    officials = () => {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.officicalsData[0]}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity>
                                <Image source={{uri: item.photoUrl}} style={{width: 100, height: 100}}/>
                                <Text>{item.name}</Text>
                                <Text>{item.party}</Text>
                                <Text>{item.role}</Text>
                                <Text>Socials: </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.name}
                />
            </View>
        )
    }

    allLevels = (address) => {
        let url = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&key=${api_key}`

        let req = new Request(url, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = [...this.state.officicalsData, response.officials].filter(elem => {
                    return elem !== undefined
                })

                let office = [...this.state.officesData, response.offices].filter(elem => {
                    return elem !== undefined
                })

                this.setState({
                    officicalsData: data,
                    officesData: office,
                    isLoading: false
                })

                // console.log(Object.keys(this.state.officicalsData[0]).length);
                this.findOfficialRole()
            })
            .catch(console.log)
    }

    federal = (address) => {
        let federalUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=country&key=${api_key}`;

        let req = new Request(federalUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = [...this.state.officicalsData, response.officials].filter(elem => {
                    return elem !== undefined
                })

                let office = [...this.state.officesData, response.offices].filter(elem => {
                    return elem !== undefined
                })

                this.setState({
                    officicalsData: data,
                    officesData: office,
                    isLoading: false
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    stateFunc = (address) => {
        let stateUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=administrativeArea1&key=${api_key}`;

        let req = new Request(stateUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = [...this.state.officicalsData, response.officials].filter(elem => {
                    return elem !== undefined
                })

                let office = [...this.state.officesData, response.offices].filter(elem => {
                    return elem !== undefined
                })

                this.setState({
                    officicalsData: data,
                    officesData: office,
                    isLoading: false
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    county = (address) => {
        let countyUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=administrativeArea2&key=${api_key}`;

        let req = new Request(countyUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = [...this.state.officicalsData, response.officials].filter(elem => {
                    return elem !== undefined
                })

                let office = [...this.state.officesData, response.offices].filter(elem => {
                    return elem !== undefined
                })
    
                this.setState({
                    officicalsData: data,
                    officesData: office,
                    isLoading: false
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    local = (address) => {
        let localUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=locality&key=${api_key}`;

        let req = new Request(localUrl, {
            method: 'Get'
        })

        fetch(req)
            .then(response => response.json())
            .then(response => {
                let data = [...this.state.officicalsData, response.officials].filter(elem => {
                    return elem !== undefined
                })

                let office = [...this.state.officesData, response.offices].filter(elem => {
                    return elem !== undefined
                })
    
                this.setState({
                    officicalsData: data,
                    officesData: office,
                    isLoading: false
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    changeHandler = (val) => {
        
        let address = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        let { federal, state, county, local } = this.state

        this.setState({
            officicalsData : [],
            officesData: []
        })

        if (local && county && state && federal) {
            this.allLevels(address)
        }
        else {
            if (local)
                this.local(address)
            if (county)
                this.county(address)
            if (state)
                this.stateFunc(address)
            if (federal)
                this.federal(address)
        }
    }

    render() {
        return (
            <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
                {/* Searchbar */}
                <TextInput
                    placeholder='Type City, State i.e. Miami, FL then press enter'
                    onSubmitEditing={this.changeHandler}
                />
                {/* Button bar */}
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    {/* Checkboxs for local, county, state, federal */}
                    <CheckBox
                        disabled={false}
                        value={this.state.local}
                        onValueChange={() => this.state.local ? this.setState({ local: false })
                            : this.setState({ local: true })}
                    /><Text>Local</Text>
                    <CheckBox
                        disabled={false}
                        value={this.state.county}
                        onValueChange={() => this.state.county ? this.setState({ county: false })
                            : this.setState({ county: true })}
                    /><Text>County</Text>
                    <CheckBox
                        disabled={false}
                        value={this.state.state}
                        onValueChange={() => this.state.state ? this.setState({ state: false })
                            : this.setState({ state: true })}
                    /><Text>State</Text>
                    <CheckBox
                        disabled={false}
                        value={this.state.federal}
                        onValueChange={() => this.state.federal ? this.setState({ federal: false })
                            : this.setState({ federal: true })}
                    /><Text>Federal</Text>
                </View>
                {/* Flatlist of data */}
                {
                    this.state.isLoading ? (<ActivityIndicator size={'large'}/>) : (<this.officials/>)
                }
            </View>
        )
    }
}
