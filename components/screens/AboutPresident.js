import * as React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useFonts, Raleway_700Bold, Raleway_400Regular } from '@expo-google-fonts/raleway';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Menu, Provider, Modal, Portal } from 'react-native-paper';

import presPolicies from '../presPolicies';

const Policies = (presidentName) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [visibleModal, setVisibleModal] = React.useState(false);
    const [currentPolicy, setPolicy] = React.useState('');
    const showModal = (policy) => {
        if (policy == 'cj')
            setPolicy(presPolicies[presidentName].criminalJustice)
        else if (policy == 'ec')
            setPolicy(presPolicies[presidentName].economy)
        else if (policy == 'ed')
            setPolicy(presPolicies[presidentName].education)
        else if (policy == 'en')
            setPolicy(presPolicies[presidentName].energyAndEnvironment)
        else if (policy == 'fo')
            setPolicy(presPolicies[presidentName].foreignPolicy)
        else if (policy == 'gu')
            setPolicy(presPolicies[presidentName].gunRegulation)
        else if (policy == 'he')
            setPolicy(presPolicies[presidentName].healthcare)
        else if (policy == 'imm')
            setPolicy(presPolicies[presidentName].immigration)
        else if (policy == 'im')
            setPolicy(presPolicies[presidentName].impeachment)
        else if (policy == 'la')
            setPolicy(presPolicies[presidentName].labor)
        else
            setPolicy(presPolicies[presidentName].trade)
        
        setVisibleModal(true);
    }
    const hideModal = () => setVisibleModal(false);

    return (
        <Provider>
            <View>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Policies Menu</Button>}>
                    <Menu.Item onPress={() => {
                        showModal('cj')
                        closeMenu()}} title='Criminal Justice' />
                    <Menu.Item onPress={() => {
                        showModal('ec')
                        closeMenu()}} title='Economy' />
                    <Menu.Item onPress={() => {
                        showModal('ed')
                        closeMenu()}} title='Education' />
                    <Menu.Item onPress={() => {
                        showModal('en')
                        closeMenu()}} title='Energy And Environment' />
                    <Menu.Item onPress={() => {
                        showModal('fo')
                        closeMenu()}} title='Foreign Policy' />
                    <Menu.Item onPress={() => {
                        showModal('gu')
                        closeMenu()}} title='Gun Regulation' />
                    <Menu.Item onPress={() => {
                        showModal('he')
                        closeMenu()}} title='Healthcaree' />
                    <Menu.Item onPress={() => {
                        showModal('imm')
                        closeMenu()}} title='Immigration' />
                    <Menu.Item onPress={() => {
                        showModal('im')
                        closeMenu()}} title='Impeachment' />
                    <Menu.Item onPress={() => {
                        showModal('la')
                        closeMenu()}} title='Labor' />
                    <Menu.Item onPress={() => {
                        showModal('tr')
                        closeMenu()}} title='Trade' />
                </Menu>
                <Portal>
                    <Modal
                        visible={visibleModal}
                        onDismiss={hideModal}
                        contentContainerStyle={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', margin : 10, padding : 10 }}>
                        <Text>{currentPolicy}</Text>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    )
}

export default function AboutPresident({ navigation, president }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <MaterialCommunityIcons name='backburger' size={24} color='black' style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.content}>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    {/* President */}
                    <Text>{president.name}</Text>
                    <Image source={{ uri: president.imageUrl }} style={styles.image} />
                    <Text>Party: {president.party}</Text>
                    <Text>{president.description}</Text>
                    {/* Running Mate */}
                    {president.runningMate.name !== null ?
                        (<>
                            <Text>RunningMate: {president.runningMate.name}</Text>
                            <Image source={{ uri: president.runningMate.imageUrl }} style={styles.image} />
                        </>
                        ) : (<Text>No Running Mate Yet</Text>)
                    }
                    {/* Add Button and linking feature */}
                    <Text>Contact Info: {president.contactInfo.website}</Text>
                    {/* Display Social Media and linking feature */}
                    {/* Policies */}
                    {Policies(president.name.split(' ')[1].toLowerCase())}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    content: {
        flex: 2,
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
