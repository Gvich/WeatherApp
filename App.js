import React from "react";
import {StatusBar} from 'expo-status-bar';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import Loading from "./components/Loading";
import axios from "axios";
import Weather from "./components/Weather";
import "./utils/i18n";


const API_KEY = '2069a42d6bc2dded09a142352f6a02d1';

export default class extends React.Component {

    state = {
        isLoading: true
    }

    getWeather = async (latitude, longitude) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        const {data: {main: {temp}, weather, name}} = await axios.get(url)
        this.setState({
            isLoading: false,
            temp: temp,
            condition: weather[0].main,
            name: name
        })
        console.log(temp, weather, name)
    }

    getLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
            console.log(latitude, longitude);
            await this.getWeather(latitude, longitude)
        } catch (error) {
            Alert.alert("Can't determine your current location", "Very sad :(")
        }

    }

    componentDidMount() {
        this.getLocation().then();
    }

    render() {
        const {isLoading, temp, condition, name} = this.state

        return (
            <SafeAreaView style={styles.container}>
                {isLoading ? <Loading/> : <Weather temp={Math.round(temp)} conditions={condition} city={name}/>}
                <StatusBar style={"auto"}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});

