import React, {useEffect} from "react";
import {StyleSheet, Text} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    cancelAnimation,
    Easing,
} from 'react-native-reanimated';
import {useTranslation} from "react-i18next";


function Loading() {
    const {t} = useTranslation();

    const rotation = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${rotation.value}deg`,
                },
            ],
        };
    }, [rotation.value]);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 1000,
                easing: Easing.linear,
            }),
            200
        );
        return () => cancelAnimation(rotation);
    }, []);


    return (
        <>
            <LinearGradient
                colors={['#ffe137', '#FFFFFF']}
                style={styles.container}>
                <Animated.View style={[styles.spinner, animatedStyles]}/>
                <Text style={styles.text}>{t('Get weather data')}</Text>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    spinner: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 7,
        borderTopColor: '#f5f5f5',
        borderRightColor: '#f5f5f5',
        borderBottomColor: '#f5f5f5',
        borderLeftColor: 'yellow',
    },
})

export default Loading;

