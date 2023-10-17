import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

export function Lupa () {
    return(
        <View>
            <SvgUri
                width="24"
                height="24"
                source={require('../assets/vectors/lupa.svg')}
            />
        </View>
    );
}