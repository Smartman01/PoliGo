import React, { Component } from 'react'
import { Text, View } from 'react-native'

const api_key = 'AIzaSyCElhp5ZT45S4lHLnZRC-mmRs1c14uyzto';
const address = 'palmcoast';

const federalUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${ address }&includeOffices=true&levels=country&key=${ api_key }`;
const stateUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${ address }&includeOffices=true&levels=administrativeArea1&key=${ api_key }`;
const countyUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${ address }&includeOffices=true&levels=administrativeArea2&key=${ api_key }`;
const localUrl = `https://www.googleapis.com/civicinfo/v2/representatives?address=${ address }&includeOffices=true&levels=locality&key=${ api_key }`;

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
            levels: {
                federal: true,
                state: true,
                county: true,
                local: true
            },
            officicalsData: []
        }
    }

    componentDidMount() {
        this.federal();
    }

    federal = () => {
        let req = new Request(federalUrl, {
            method: 'Get'
        })

        fetch(req)
        .then(response => response.json())
        .then(response => console.log(response.officials[0]))
        .catch(console.log)
    }

    state = () => {
        let req = new Request(stateUrl, {
            method: 'Get'
        })

        fetch(req)
        .then(response => response.json())
        .then(response => console.log(response.officials[0]))
        .catch(console.log)
    }

    county = () => {
        let req = new Request(countyUrl, {
            method: 'Get'
        })

        fetch(req)
        .then(response => response.json())
        .then(response => console.log(response.officials[0]))
        .catch(console.log)
    }

    local = () => {
        let req = new Request(localUrl, {
            method: 'Get'
        })

        fetch(req)
        .then(response => response.json())
        .then(response => console.log(response.officials[0]))
        .catch(console.log)
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                {/* Searchbar */}
                {/* Button bar */}
                    {/* Checkboxs for local, county, state, federal */}
                {/* Cardview of officials wrapped in flatlist or scrollview */}
                    {/* Picture */}
                    {/* Name */}
                    {/* title/role */}
                    {/* Favorites Button */}
                    {console.log(address)}
            </View>
        )
    }
}
