import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
/* import { EditButton } from '../../components/EditButton';*/
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { DropdownComponent } from './dropdown-component';


const userSelector = (context) => [context.user]

export const MenuProfile = ({setShowMenu}) => {
    const translateX = useRef(new Animated.Value(200)).current;
    const { user, signOut } = useAuthenticator(userSelector);

    useEffect(() => {
        const animationIn = Animated.timing(translateX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        });
        animationIn.start();
    
    }, [translateX]);
    
    function handleCloseMenu() {
        Animated.timing(translateX, {
            toValue: 200,
            duration: 500,
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
                    {/* Aca iria la imagen */}
                    <View style={styles.frame11}>
                        <Text style={styles.$name}>
                            Eze Braunstein
                        </Text>
                        <DropdownComponent/>
                    </View>
                </View>
                {/* Aca el editar perfil */}
                <View style={styles.column}>
                    <View style={styles.navItem}>
                        <View style={styles.row}>
                            <View style={styles.FontAwesome5s}>
                            </View>
                            <Text style={styles.text}>
                                Add Products
                            </Text>
                                <FontAwesome5 name="plus" size={20} />
                        </View>
                    </View>
                    <View style={styles.navItem}>
                        <View style={styles.row}>
                            <Text style={styles.text}>
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
                <TouchableWithoutFeedback onPress={signOut} >
                    <View style={styles.navItem}>
                        <View style={styles.frame3}>
                        <FontAwesome5 name="sign-out-alt" size={20} solid/>                        
                            <Text style={styles.text}>
                                Log Out
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
        color: '#000',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 29,
    },
    navItem: {
        flexDirection: 'row',
        height: 65,
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    column :{
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
});
