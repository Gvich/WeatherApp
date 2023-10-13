import React, {useState, useEffect} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import {useTranslation} from "react-i18next";

const TextUp = ({text, fontSize, fontWeight,marginBottom, theme}) => {
    const [showPopup, setShowPopup] = useState(false);
    const {t} = useTranslation();


    useEffect(() => {
        if (!showPopup) {
            setShowPopup(true);
        }
    }, []);

    const translateY = new Animated.Value(100); // Исходное значение смещения по Y

    useEffect(() => {
        if (showPopup) {
            Animated.timing(translateY, {
                toValue: 0, // Конечное значение смещения по Y
                duration: 500, // Длительность анимации
                useNativeDriver: false,
            }).start();
        }
    }, [showPopup]);

    return (
        <View>
            {showPopup && (
                <TouchableOpacity
                    // onPress={() => setShowPopup(false)}
                    style={{
                        transform: [{translateY}],
                    }}
                >
                    <Text style={{
                        color: theme === 'light' ? 'white' : 'black',
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        marginBottom: marginBottom,
                        textAlign: 'left',
                    }}>{t(text)}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TextUp;
