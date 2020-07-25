import React, { Component, PureComponent } from 'react'
import { Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import {CheckBox} from "native-base"
import profileImage from '../../assets/kindpng_785827.png'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import stateMayorData from '../stateMayorData'

import api_key from '../../API_KEY'

// parsing out division IDs
var federal_pattern = "ocd-division/country:us";
var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
var local_pattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;


class FederalScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            location: {
                city: null,
                state: null
            },
            officicalsData: [],
            officesData: [],
            address: null
        }
    }

    async componentDidMount() {
        try {
            let address = await AsyncStorage.getItem('address')

            if (address !== null) {
                this.setState({
                    officicalsData: [],
                    officesData: [],
                    isLoading: true,
                    address: address
                })

                this.federal()
            }
        } catch (err) {
            alert(err)
        }
    }

    findOfficialRole = () => {
        let { officicalsData, officesData } = this.state

        let foundRole = 0, i = 0, j = 0, k = 0;

        if (officicalsData[0] === null)
        return

        for (i = 0; i < Object.keys(officicalsData[0]).length; i++) {
            for (j = 0; j < Object.keys(officesData[0]).length; j++) {
                foundRole = 0;

                for (k = 0; k < officesData[0][j].officialIndices.length; k++) {
                    if (i === officesData[0][j].officialIndices[k]) {
                        officicalsData[0][i].role = officesData[0][j].name;

                        // console.log(officicalsData[0][i])

                        foundRole = 1;
                        break;
                    }
                }

                if (foundRole)
                    break;
            }
        }

        this.setState({
            isLoading: false
        })
    }

    officials = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.officicalsData[0]}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity>
                                {item.photoUrl !== undefined ? <Image source={{ uri: item.photoUrl }} style={{ width: 100, height: 100 }} />
                                    : <Image source={profileImage} style={{ width: 100, height: 100 }} />}
                                <Text>{item.name}</Text>
                                <Text>{item.party}</Text>
                                <Text>{item.role}</Text>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.name}
                />
            </View>
        )
    }

    federal = () => {
        let federalUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${this.state.address}&includeOffices=true&levels=country&key=${api_key}`;

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

                    location: {
                        city: response.normalizedInput.city,
                        state: response.normalizedInput.state
                    }
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    changeHandler = (val) => {
        if (val.nativeEvent.text == "")
            return

        let address = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        this.setState({
            officicalsData: [],
            officesData: [],
            isLoading: true,
            address: address
        })

        this.federal()
    }

    render() {
        return (
            <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
                {/* Searchbar */}
                <TextInput 
                    placeholder={'City, State'}
                    onSubmitEditing={(val) => this.changeHandler(val)} />
                {/* Flatlist of data */}
                {
                    this.state.isLoading ? (<ActivityIndicator size={'large'} />) : (<this.officials />)
                }
            </View>
        )
    }
}

class StateScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            location: {
                city: null,
                state: null
            },
            officicalsData: [],
            officesData: [],
            address: null
        }
    }

    async componentDidMount() {
        try {
            let address = await AsyncStorage.getItem('address')

            if (address !== null) {
                this.setState({
                    officicalsData: [],
                    officesData: [],
                    isLoading: true,
                    address: address
                })
        
                this.stateFunc()
            }
        } catch (err) {
            alert(err)
        }
    }

    findOfficialRole = () => {
        let { officicalsData, officesData } = this.state

        let foundRole = 0, i = 0, j = 0, k = 0;

        if (officicalsData[0] === null)
            return

        for (i = 0; i < Object.keys(officicalsData[0]).length; i++) {
            for (j = 0; j < Object.keys(officesData[0]).length; j++) {
                foundRole = 0;

                for (k = 0; k < officesData[0][j].officialIndices.length; k++) {
                    if (i === officesData[0][j].officialIndices[k]) {
                        officicalsData[0][i].role = officesData[0][j].name;

                        // console.log(officicalsData[0][i])

                        foundRole = 1;
                        break;
                    }
                }

                if (foundRole)
                    break;
            }
        }

        this.setState({
            isLoading: false
        })
    }

    officials = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.officicalsData[0]}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity>
                                {item.photoUrl !== undefined ? <Image source={{ uri: item.photoUrl }} style={{ width: 100, height: 100 }} />
                                    : <Image source={profileImage} style={{ width: 100, height: 100 }} />}
                                <Text>{item.name}</Text>
                                <Text>{item.party}</Text>
                                <Text>{item.role}</Text>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.name}
                />
            </View>
        )
    }

    stateFunc = () => {
        let stateUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${this.state.address}&includeOffices=true&levels=administrativeArea1&key=${api_key}`;

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

                    location: {
                        city: response.normalizedInput.city,
                        state: response.normalizedInput.state
                    }
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    changeHandler = (val) => {
        if (val.nativeEvent.text == "")
            return

        let address = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        this.setState({
            officicalsData: [],
            officesData: [],
            isLoading: true,
            address: address
        })

        this.stateFunc()
    }

    render() {
        return (
            <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
                {/* Searchbar */}
                <TextInput 
                    placeholder={'City, State'}
                    onSubmitEditing={(val) => this.changeHandler(val)} />
                {/* Flatlist of data */}
                {
                    this.state.isLoading ? (<ActivityIndicator size={'large'} />) : (<this.officials />)
                }
            </View>
        )
    }
}

class CountyAndLocalScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            location: {
                city: null,
                state: null
            },
            officicalsData: [],
            officesData: [],
            address: null
        }
    }

    async componentDidMount() {
        try {
            let address = await AsyncStorage.getItem('address')

            if (address !== null) {
                this.setState({
                    officicalsData: [],
                    officesData: [],
                    isLoading: true,
                    address: address
                })
        
                this.county()
                this.local()
            }
        } catch (err) {
            alert(err)
        }
    }

    findOfficialRole = () => {
        let { officicalsData, officesData } = this.state

        let foundRole = 0, i = 0, j = 0, k = 0;

        if (officicalsData[0] === null)
            return
        
        for (i = 0; i < Object.keys(officicalsData[0]).length; i++) {
            for (j = 0; j < Object.keys(officesData[0]).length; j++) {
                foundRole = 0;

                for (k = 0; k < officesData[0][j].officialIndices.length; k++) {
                    if (i === officesData[0][j].officialIndices[k]) {
                        officicalsData[0][i].role = officesData[0][j].name;

                        foundRole = 1;
                        break;
                    }
                }

                if (foundRole)
                    break;
            }
        }

        this.setState({
            isLoading: false
        })
    }

    officials = () => {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.officicalsData[0]}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity>
                                {item.photoUrl !== undefined ? <Image source={{ uri: item.photoUrl }} style={{ width: 100, height: 100 }} />
                                    : <Image source={profileImage} style={{ width: 100, height: 100 }} />}
                                <Text>{item.name}</Text>
                                <Text>{item.party}</Text>
                                <Text>{item.role}</Text>
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.name}
                />
            </View>
        )
    }

    county = () => {
        let countyUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${this.state.address}&includeOffices=true&levels=administrativeArea2&key=${api_key}`;

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

                    location: {
                        city: response.normalizedInput.city,
                        state: response.normalizedInput.state
                    }
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    local = () => {
        let localUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${this.state.address}&includeOffices=true&levels=locality&key=${api_key}`;

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

                    location: {
                        city: response.normalizedInput.city,
                        state: response.normalizedInput.state
                    }
                })

                this.findOfficialRole()
            })
            .catch(console.log)
    }

    changeHandler = (val) => {
        if (val.nativeEvent.text == "")
            return

        let address = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        this.setState({
            officicalsData: [],
            officesData: [],
            isLoading: true,
            address: address
        })

        this.county()
        this.local()
    }

    render() {
        return (
            <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
                {/* Searchbar */}
                <TextInput 
                    placeholder={'City, State'}
                    onSubmitEditing={(val) => this.changeHandler(val)}
                />
                {/* Flatlist of data */}
                {
                    this.state.isLoading ? (<ActivityIndicator size={'large'} />) : (<this.officials />)
                }
            </View>
        )
    }
}

class MayorScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            showState: false,
            stateData: {},
            cityData: {}
        };
    }

    async componentDidMount() {
        try {
            let address = await AsyncStorage.getItem('address')
            let unedited = await AsyncStorage.getItem('UneditedAddress')

            if (address !== null) {
                this.mayors(address, unedited)
            }
        } catch (err) {
            alert(err)
        }
    }

    mayors = (address, unedited) => {
        let stateName = address.split('%2c%20')[1].toUpperCase()
                
        let stateData = stateMayorData.filter(elem => {
            return elem.state == stateName
        })

        let cityData = stateMayorData.filter(elem => {
            return elem.city.includes(unedited.split(', ')[0])
        })

        this.setState({
            stateData: stateData,
            cityData: cityData,
            isLoading: false
        })
    }

    changeHandler = (val) => {
        if (val.nativeEvent.text == "")
            return
        
        let address = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        this.state = {
            isLoading: true,
            stateData: {},
            cityData: {}
        }

        this.mayors(address, val.nativeEvent.text)
    }

    render() {
        const { stateData, cityData } = this.state

        function ShowStateData() {
            return (
                <FlatList
                    data={stateData}
                    renderItem={({ item }) => (
                        <View style={{ margin: 10, alignItems: 'center', backgroundColor: '#fff' }}>
                            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                            <Text>{item.city}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.website}</Text>
                            <Text>{item.electionDate}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.key.toString()}
                />
            );
        }

        function ShowCityData() {
            return (
                <FlatList
                    data={cityData}
                    renderItem={({ item }) => (
                        <View style={{ margin: 20, alignItems: 'center', backgroundColor: '#fff' }}>
                            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                            <Text>{item.city}</Text>
                            <Text>{item.name}</Text>
                            <Text>{item.website}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.key.toString()}
                />
            )
        }

        return (
            <View style={{ marginTop: 20, flex: 1 }}>
                <TextInput 
                    placeholder={'City, State'}
                    onSubmitEditing={(val) => this.changeHandler(val)} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        checked={this.state.showState}
                        onPress={() => this.state.showState ? this.setState({
                            showState: false
                        }) : this.setState({
                            showState: true
                        })}
                    />
                    <Text style={{marginLeft: 20}}>State Mayors</Text>
                </View>

                { this.state.isLoading ? <ActivityIndicator /> :(this.state.showState ? <ShowStateData /> : <ShowCityData />)}
            </View>
        );
    }
}

const Tab = createMaterialTopTabNavigator();

function OfficialsScreen() {
    return (
        <Tab.Navigator style={{ marginTop: Constants.statusBarHeight }}>
            <Tab.Screen name='County/Local Officials' component={CountyAndLocalScreen} />
            <Tab.Screen name='Mayors' component={MayorScreen} />
            <Tab.Screen name='State Officials' component={StateScreen} />
            <Tab.Screen name='Federal Officials' component={FederalScreen} />
        </Tab.Navigator>
    )
}

export default OfficialsScreen