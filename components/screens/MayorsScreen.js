import React, { PureComponent } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import stateMayorData from '../stateMayorData'
import CheckBox from '@react-native-community/checkbox'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class MayorsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showState: false,
            stateData: {},
            cityData: {}
        };
    }

    componentDidMount() {
        let stateData = stateMayorData.filter(elem => {
            return elem.state == this.props.location.state
        })

        let cityData = stateMayorData.filter(elem => {
            return elem.city == this.props.location.city + ', ' + this.props.location.state
        })

        this.setState({
            stateData: stateData,
            cityData: cityData
        })
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
                    keyExtractor={(item) => item.key}
                />
            )
        }

        return (
            <View style={{ marginTop: 20, flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <MaterialCommunityIcons name='backburger' size={24} color='black' />
                    </TouchableOpacity>
                    <CheckBox
                        disabled={false}
                        value={this.state.showState}
                        onValueChange={() => this.state.showState ? this.setState({
                            showState: false
                        }) : this.setState({
                            showState: true
                        })}
                    />
                    <Text>State Mayors</Text>
                </View>

                {this.state.showState ? <ShowStateData /> : <ShowCityData />}
            </View>
        );
    }
}
