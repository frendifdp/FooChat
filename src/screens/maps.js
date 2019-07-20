import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Modal, TouchableWithoutFeedback, AsyncStorage, View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView, FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase'
import profile from './profile';
import chat from './chat';
import userList from './userList';
import { createStackNavigator } from 'react-navigation';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            uName: '',
            uAvatar: '',
            modalVisible: false,
            users: []
        }

        Geolocation.getCurrentPosition(info => {
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
        })
    }

    componentWillMount = async () => {
        this.setState({ myUid: await AsyncStorage.getItem('myUid'), users: [] })
    }

    myProfile = () => {
        //
        console.warn('hmmm')
    };

    friendList = () => {
        this.props.navigation.navigate('userList')
    };

    getLocation = () => {
        Geolocation.getCurrentPosition(info => {
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })
            console.warn('ok')
        })
    }

    onAvatar = (user) => {
        this.setState({
            modalVisible: true,
            uName: user.name,
            uAvatar: user.avatar
        })
    }

    componentDidMount = async () => {
        await firebase.database().ref('users/').on('child_added', (value) => {
            let person = value.val()
            person.uid = value.key
            if (person.uid !== this.state.myUid) {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        });
    }



    renderItem = ({ item }) => (
        // <TouchableOpacity style={styles.user}
        //     onPress={() => this.props.navigation.navigate('chat', item)}
        // >
        //     <Text style={{ marginLeft: 5, marginTop: 12 }}>{item.name}</Text>
        // </TouchableOpacity>

        <View style={{ backgroundColor: 'white', marginRight: 10, elevation: 10, borderRadius: 5 }} onPress={() => this.setState({ activeModal: item })} >
            <View style={[styles.parking, styles.shadow]}>
                <View style={styles.hours}>
                    <Text style={styles.hoursTitle}>{item.name}</Text>
                </View>
                <View style={styles.potoAvatar}>
                    <TouchableOpacity style={styles.parentAvatar}
                        onPress={() => this.props.navigation.navigate('chat', item)}
                        onLongPress={() => this.props.navigation.navigate('profile', item)}
                    >
                        <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    </TouchableOpacity>

                </View>
            </View>


        </View>
    )

    render() {
        return (
            <View style={styles.container}>

                <MapView
                    style={styles.map}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }}>

                    {
                        this.state.users.map((item, key) => (
                            <Marker
                                key={key}
                                title={item.name}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                    latitudeDelta: 0.0043,
                                    longitudeDelta: 0.0034
                                }} />
                        )
                        )
                    }

                </MapView>

                <TouchableOpacity style={{ ...styles.fab, left: 10, top: 10 }}
                onPress={() => { this.props.navigation.navigate('profile') }}>
                    <Image style={styles.iconfab} source={require('../../assets/images/usericon.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.fab, right: 10, top: 10 }}
                onPress={() => { this.props.navigation.navigate('userList') }}>
                    <Image style={styles.iconfab} source={require('../../assets/images/friendicon.png')}></Image>
                </TouchableOpacity>

                <FlatList
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    style={styles.parkings}
                    data={this.state.users}
                    keyExtractor={(item) => item.uid}
                    renderItem={this.renderItem}
                />

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <TouchableOpacity style={styles.modal} onPress={() => {
                        this.setState({ modalVisible: false })
                    }}>
                        <View style={styles.modalCont}>
                            <Image source={{ uri: this.state.uAvatar }} />
                            <Text>{this.state.uName}</Text>
                            {/* <Text>{this.state.uName}</Text>
                    <Text>{this.state.uName}</Text> */}
                        </View>
                    </TouchableOpacity>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    parkings: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        paddingBottom: 10
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    potoAvatar: { flex: 1 },
    parentAvatar: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 6,
    },
    hours: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15,
        justifyContent: 'space-evenly',
    },
    fab: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    iconfab: {
        width: 30,
        height: 30
    },
    user: {
        position: 'absolute',
        bottom: 0,
        width: 75,
        height: 100,
        backgroundColor: 'white'
    },
    modalCont: {
        backgroundColor: 'white',
        width: 200,
        height: 100,
        borderRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const AppNavigator = createStackNavigator({
    maps: {
        screen: App,
        navigationOptions: {
            header: null
        }
    },
    userList: {
        screen: userList,
        navigationOptions: {
            title: "User List"
        }
    },
    chat: {
        screen: chat
    },
    profile: {
        screen: profile
    }
});

export default AppNavigator;