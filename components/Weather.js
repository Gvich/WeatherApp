import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";
import Animated, {
    useSharedValue,
    useAnimatedStyle, withRepeat, withTiming,
} from 'react-native-reanimated';
import TextUp from "./Text";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import weatherOptions from "../utils/weatherOptions";
import DropDownMenu from "./DropDownMenu";



async function chooseLanguage (lang:string) {
    if (lang === 'en') {
        await i18next.changeLanguage(lang)
        console.log('en')
    } else {
        console.log('ru')
        await i18next.changeLanguage(lang)
    }
}

export default function Weather({temp, conditions, city}) {
    const [theme, setTheme] = useState('light');

    const rotation = useSharedValue(0);

    const {t} = useTranslation();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotateZ: `${rotation.value}deg`}],
        };
    });

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    return (
        <LinearGradient
            colors={weatherOptions[conditions].gradient}
            style={styles.container}>
            <View style={styles.halfContainer}>
                <Animated.View style={[animatedStyle]}>
                    <MaterialCommunityIcons name={weatherOptions[conditions].iconName} size={90} color={theme === 'light'? 'white': 'black'}/>
                </Animated.View>
                <Text style={theme === 'light'? styles.temp : styles.tempDark}>{temp}° C</Text>
                <Text style={theme === 'light'? styles.city : styles.cityDark}>{t(city)}</Text>
            </View>
            <View style={styles.dropDown}>
                <DropDownMenu chooseLanguage={chooseLanguage} theme={theme}/>
                <TouchableOpacity onPress={toggleTheme}>
                    <Text style={theme === 'light'? styles.themeButtonLight : styles.themeButtonDark}>{t('Toggle Theme')}</Text>
                </TouchableOpacity>
            </View>
            <View style={{...styles.halfContainer, ...styles.textContainer}}>
                <TouchableOpacity
                    style={styles.title}
                    onPress={() => {
                        rotation.value = withRepeat(withTiming(10), 6, true);
                    }}
                    activeOpacity={1}
                >
                    <Text style={theme === 'light' ? styles.title : styles.titleDark}>
                        {t(weatherOptions[conditions].title)}
                    </Text>
                </TouchableOpacity>
                <TextUp text={weatherOptions[conditions].subtitle} fontSize={24} fontWeight={'600'} marginBottom={0} theme={theme}/>
            </View>
        </LinearGradient>
    );
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    conditions: PropTypes.oneOf(['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado', 'Clear', 'Clouds']).isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    halfContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'red',
        // borderWidth: 1
    },
    temp: {
        fontSize: 42,
        color: 'white'
    },
    city: {
        fontSize: 21,
        color: 'white'
    },
    tempDark: {
        fontSize: 42,
        color: 'black'
    },
    cityDark: {
        fontSize: 21,
        color: 'black'
    },
    title: {
        color: "white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10,
        textAlign: 'left',
    },
    titleDark: {
        color: "black",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10,
        textAlign: 'left',
    },
    subtitle: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,
        textAlign: 'left',
    },
    textContainer: {
        paddingHorizontal: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    dropDown: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",

        // flex: 1,
        // borderColor: 'red',
        // borderWidth: 1
    },
    themeButtonLight: {
        padding: 12,
        color: 'white',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'white',
        marginLeft: 10
    },
    themeButtonDark: {
        padding: 12,
        color: 'black',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        marginLeft: 10
    },
})