import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { List } from 'react-native-paper';
import Constants from 'expo-constants';

import presPolicies from '../presPolicies';

export default class PresidentPoliciesScreen extends Component {
    render() {
        const pres = this.props.president.name.split(' ')[1].toLowerCase()
        return (
            <ScrollView contentContainerStyle={{}}>
                <List.AccordionGroup>
                    <List.Accordion title="Criminal Justice" id="1">
                        <List.Item title={presPolicies[pres].criminalJustice} />
                    </List.Accordion>
                    <List.Accordion title="Economy" id="2">
                        <List.Item title={presPolicies[pres].economy} />
                    </List.Accordion>
                    <List.Accordion title="Education" id="3">
                        <List.Item title={presPolicies[pres].education} />
                    </List.Accordion>
                    <List.Accordion title="Energy And Environment" id="4">
                        <List.Item title={presPolicies[pres].energyAndEnvironment} />
                    </List.Accordion>
                    <List.Accordion title="Foreign Policy" id="5">
                        <List.Item title={presPolicies[pres].foreignPolicy} />
                    </List.Accordion>
                    <List.Accordion title="Gun Regulation" id="6">
                        <List.Item title={presPolicies[pres].gunRegulation} />
                    </List.Accordion>
                    <List.Accordion title="Healthcare" id="7">
                        <List.Item title={presPolicies[pres].healthcare} />
                    </List.Accordion>
                    <List.Accordion title="Immigration" id="8">
                        <List.Item title={presPolicies[pres].immigration} />
                    </List.Accordion>
                    <List.Accordion title="Impeachment" id="9">
                        <List.Item title={presPolicies[pres].impeachment} />
                    </List.Accordion>
                    <List.Accordion title="Labor Unions" id="10">
                        <List.Item title={presPolicies[pres].labor} />
                    </List.Accordion>
                    <List.Accordion title="Trade" id="11">
                        <List.Item title={presPolicies[pres].trade} />
                    </List.Accordion>
                </List.AccordionGroup>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    content: {
        flex: 2,
        alignItems: "center",
    },
    backButton: {
        marginLeft: 10
    },
    image: {
        width: 250,
        height: 300,
        margin: 10
    }
})