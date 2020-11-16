import { useState, useEffect } from 'react';
import { Platform, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import states_hash from './data/states_hash'

let storageAddress = loadAddress()

// export default class GetLocation extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             errorMsg: null
//         }
//     }

//     async componentDidMount() {
//         if (Platform.OS === 'android' && !Constants.isDevice) {
//             setErrorMsg(
//                 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
//             );
//         } else {
//             (async () => {
//                 let { status } = await Location.requestPermissionsAsync();
//                 if (status !== 'granted') {
//                     this.setState({
//                         errorMsg: 'Permission to access location was denied'
//                     })
//                 }

//                 let location = await Location.getCurrentPositionAsync({});

//                 let reverseLocation = await Location.reverseGeocodeAsync({
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude
//                 })

//                 let address = reverseLocation[0].city + ', ' + states_hash[reverseLocation[0].region]

//                 this.save(address)

//                 // console.log(location.coords.longitude);
//                 // console.log(location.coords.latitude);
//                 // console.log(address);
//             })();
//         }
//     }

//     save = async (address) => {
//         const dispatch = useDispatch();

//         let userAddress = {
//             address: address.replace(/ /g, '%20').replace(',', '%2C').toLowerCase(),
//             UneditedAddress: address
//         }

//         dispatch(setLoction(userAddress))

//         try {
//             await AsyncStorage.setItem('userAddress', JSON.stringify(userAddress))
//         } catch (err) {
//             alert(err)
//         }
//     }

//     render() { return (null) }
// }

async function loadAddress() {
    try {
        let jsonValue = await AsyncStorage.getItem('userAddress')
        let addressObj = null

        if (jsonValue != null)
            addressObj = JSON.parse(jsonValue)

        return addressObj.address
    } catch (err) {
        alert(err)
    }
}

export default function GetLocation() {
    const [address, setAddress] = useState(storageAddress.replace(/ /g, '%20').replace(',', '%2C').toLowerCase())

    useEffect(() => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            alert(
                'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
            );
        } else {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access location was denied')
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});

                let reverseLocation = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })

                let newAddress = reverseLocation[0].city + ', ' + states_hash[reverseLocation[0].region]

                if (storageAddress != newAddress) {
                    setAddress(newAddress)
                    save()
                }

                // console.log(location.coords.longitude);
                // console.log(location.coords.latitude);
                // console.log(address);
            })();
        }

        const save = async () => {
            let userAddress = {
                address: address.replace(/ /g, '%20').replace(',', '%2C').toLowerCase(),
                UneditedAddress: address
            }

            try {
                await AsyncStorage.setItem('userAddress', JSON.stringify(userAddress))
            } catch (err) {
                alert(err)
            }
        }
    }, [])

    return address
}