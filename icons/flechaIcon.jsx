import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';

export function Flecha () {
    return(
        <View style={{ flex: 1 }}>
            <SvgUri
                width="24"
                height="24"
                source={require('../assets/vectors/flecha.svg')}
            />
        </View>
    );
}