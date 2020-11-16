import React, { PureComponent, useState, useEffect } from 'react'
import { Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import { CheckBox } from "native-base"
import profileImage from '../../assets/kindpng_785827.png'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios'

import stateMayorData from '../data/stateMayorData'

import api_key from '../../API_KEY'

// parsing out division IDs
var federal_pattern = "ocd-division/country:us";
var state_pattern = /ocd-division\/country:us\/state:(\D{2}$)/;
var county_pattern = /ocd-division\/country:us\/state:\D{2}\/county:\D+/;
var local_pattern = /ocd-division\/country:us\/state:\D{2}\/place:\D+/;

// Props
let addressProp = null
let navigationProp = null

class FederalScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            officicalsData: [],
            officesData: [],
            address: null
        }
    }

    async componentDidMount() {
        try {
            let jsonValue = await AsyncStorage.getItem('userAddress')
            let addressObj = null

            if (jsonValue != null)
                addressObj = JSON.parse(jsonValue)

            let address = addressObj.address

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

        let foundRole;

        if (officicalsData[0] === null)
            return

        for (let i = 0; i < officicalsData[0].length; i++) {
            for (let j = 0; j < officesData[0].length; j++) {
                foundRole = 0;

                for (let k = 0; k < officesData[0][j].officialIndices.length; k++) {
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
                    officesData: office
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

class StateScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            officicalsData: [],
            officesData: [],
            address: null
        }
    }

    async componentDidMount() {
        try {
            let jsonValue = await AsyncStorage.getItem('userAddress')
            let addressObj = null

            if (jsonValue != null)
                addressObj = JSON.parse(jsonValue)

            let address = addressObj.address

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

        let foundRole;

        if (officicalsData[0] === null)
            return

        for (let i = 0; i < officicalsData[0].length; i++) {
            for (let j = 0; j < officesData[0].length; j++) {
                foundRole = 0;

                for (let k = 0; k < officesData[0][j].officialIndices.length; k++) {
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

function Example() {
    const [isLoading, setIsLoading] = useState(true)
    const [officialsData, setOfficial] = useState([])
    const [officesData, setOffice] = useState([])
    const [address, setAddress] = useState(addressProp)

    useEffect(() => {
        async function axiosLookup() {
            let countyUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=administrativeArea2&key=${api_key}`;
            let localUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=locality&key=${api_key}`;

            // try {
            //     await axios.get(countyUrl)
            //     .then(res => {
            //         const data = res.data.officials
            //         setOfficial(data)
            //         // findOfficialRole()
            //         setIsLoading(false)
            //     })
            // } catch (err) {
            //     alert(err)
            // }

            axios.all([axios.get(countyUrl), axios.get(localUrl)])
                .then(axios.spread((...res) => {
                    let county = res[0].data.officials
                    let local = res[1].data.officials

                    let data = [county, local].filter(elem => {
                        return elem !== undefined
                    })

                    setOfficial(data[0])

                    county = res[0].data.offices
                    local = res[1].data.offices

                    data = [county, local].filter(elem => {
                        return elem !== undefined
                    })

                    setOffice(data[0])
                }))
                .then(() => {
                    setIsLoading(false)
                })
                .catch(err => {
                    alert(err)
                })
        }

        axiosLookup()
    }, [address]);

    const findOfficialRole = () => {
        let foundRole = 0, i, j, k;
        let data = officialsData

        if (data.length === 0)
            return

        for (i = 0; i < data.length; i++) {
            for (j = 0; j < data.length; j++) {
                foundRole = 0;

                for (k = 0; k < officesData[j].officialIndices.length; k++) {
                    if (i === officesData[j].officialIndices[k]) {
                        data[i].role = officesData[j].name;

                        foundRole = 1;
                        break;
                    }
                }

                if (foundRole)
                    break;
            }
        }

        setOfficial(data)
    }

    const changeHandler = (val) => {
        if (val.nativeEvent.text == "")
            return

        let newAddress = val.nativeEvent.text.replace(/ /g, '%20').replace(',', '%2C').toLowerCase()

        setIsLoading(true)

        setOfficial([])
        setOffice([])

        setAddress(newAddress)
    }

    return (
        <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
            {/* Searchbar */}
            <TextInput
                placeholder={'City, State'}
                onSubmitEditing={(val) => changeHandler(val)}
            />
            {/* Flatlist of data */}
            {
                isLoading ? (<ActivityIndicator size={'large'} />) : (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={officialsData}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        findOfficialRole()
                                        navigationProp.navigate("Official Info", { item });
                                    }}>
                                        {item.photoUrl !== undefined ? <Image source={{ uri: item.photoUrl }} style={{ width: 100, height: 100 }} />
                                            : <Image source={profileImage} style={{ width: 100, height: 100 }} />}
                                        <Text>{item.name}</Text>
                                        <Text>{item.party}</Text>
                                        <Text>Press for more information</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={item => item.name}
                        />
                    </View>
                )
            }
        </View>
    )
}

class MayorScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            showState: false,
            stateData: {},
            cityData: {},
            userAddress: {}
        };
    }

    async componentDidMount() {
        try {
            let jsonValue = await AsyncStorage.getItem('userAddress')

            if (jsonValue != null) {
                this.setState({ userAddress: JSON.parse(jsonValue) })
                this.mayors()
            }

        } catch (err) {
            alert(err)
        }
    }

    mayors = () => {
        let stateName = this.state.userAddress.address.split('%2c%20')[1].toUpperCase()

        let stateData = stateMayorData.filter(elem => {
            return elem.state == stateName
        })

        let cityData = stateMayorData.filter(elem => {
            return elem.city.includes(this.state.userAddress.UneditedAddress.split(', ')[0])
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
            cityData: {},
            userAddress: {
                address: address,
                UneditedAddress: val.nativeEvent.text
            }
        }

        this.mayors()
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
                    keyExtractor={(item) => item.name}
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
                    keyExtractor={(item) => item.name}
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
                    <Text style={{ marginLeft: 20 }}>State Mayors</Text>
                </View>

                {this.state.isLoading ? <ActivityIndicator /> : (this.state.showState ? <ShowStateData /> : <ShowCityData />)}
            </View>
        );
    }
}

const Tab = createMaterialTopTabNavigator();

export default function OfficialsScreen({ navigation, address }) {
    addressProp = address._55
    navigationProp = navigation

    return (
        <Tab.Navigator style={{ marginTop: Constants.statusBarHeight }}>
            <Tab.Screen name='County/Local Officials' component={Example} />
            <Tab.Screen name='Mayors' component={MayorScreen} />
            {/* <Tab.Screen name='State Officials' component={StateScreen} />
            <Tab.Screen name='Federal Officials' component={FederalScreen} /> */}
        </Tab.Navigator>
    )
}