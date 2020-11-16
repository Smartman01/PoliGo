import React from 'react'
import { View, Text, Image } from 'react-native'
import profileImage from '../../assets/kindpng_785827.png'

export default function OfficialsInfo({ navigation, info }) {
    return (
        <View>
            {console.log(info)}
            <Text></Text>
            {/* Back button to Officials/Favorite screens */}
            {/* Favorites Button */}
            {/* Name of official */}
            <Text>{info.name}</Text>
            {/* Picture */}
            {info.photoUrl !== undefined ? <Image source={{ uri: info.photoUrl }} style={{ width: 100, height: 100 }} />
                : <Image source={profileImage} style={{ width: 100, height: 100 }} />}
            {/* Party */}
            <Text>{info.party}</Text>
            {/* Role */}
            <Text>{info.role}</Text>
            {/* Contact info */}
                {/* Link to website which has event info, policies, etc */}
                {/* Office address ***No home address*** */}
                {/* Social media */}
                {/* Twitter */}
                {/* Instagram */}
                {/* Facebook */}
                {/* Youtube */}
        </View>
    )
}
