import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
/* import { EditButton } from '../../components/EditButton';*/
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const MenuProfile = ({setShowMenu}) => {
    const translateX = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
        const animationIn = Animated.timing(translateX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        });
        animationIn.start();
    
    }, [translateX]);
    
    function handleCloseMenu() {
        Animated.timing(translateX, {
            toValue: 1000,
            duration: 1000,
            useNativeDriver: true,
        }).start(close);
    }
    
    function close() {
        setShowMenu(false);
    }

    return (
        <Animated.View
        style={{
            transform: [{ translateX }],
            position: 'absolute',
            bottom: 0,
            top: '5%',
            right: 0,
            width: '50%',
            height: '95%',
          }}>
            <View style={styles.root}>
                <View style={styles.topMenu}>
                    <FontAwesome5 name="times" size={28} onPress={handleCloseMenu} />
                    {/* <Group3 />  Aca iria la imagen */}
                    <View style={styles.frame11}>
                        <Text style={styles.$name}>
                            Eze Braunstein
                        </Text>
                    </View>
                </View>
                {/* <EditButton buttonLabel={`Edit Profile`} /> */}
                <View style={styles.column}>
                    <View style={styles.navItem}>
                        <View style={styles.row}>
                            <View style={styles.FontAwesome5s}>
                            </View>
                            <Text style={styles.text1}>
                                Add Products
                            </Text>
                                <FontAwesome5 name="plus" size={20} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.text1}>
                                History
                            </Text>
                            <View>
                                <FontAwesome5 name="history" size={20} />
                            </View>
                        </View>
                    </View>
                </View>
                {/*  linea separadora */}
                <View>
                </View>
                {/*  linea separadora */}
                <View style={styles.navItem}>
                    <View style={styles.frame3}>
                    <FontAwesome5 name="sign-out-alt" size={20} solid/>                        
                        <Text style={styles.text}>
                            Log Out
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 25,
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderWidth: 1.5,
        borderColor: '#727272',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    $name: {
        color: '#000',
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 29,
    },
    topMenu: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        gap: 40,
        paddingLeft: 10,
    },
    frame11: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-end',
        gap: 1,
    },
    text: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        color: '#000',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 29,
    },
    text1: {
        color: '#000',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 29,
    },
    navItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    frame3: {
        alignItems: 'center',
        gap: 10,
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        flexDirection: 'row',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    column :{
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
});
