import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Barcode } from "./components/barcode-component";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Amplify } from "aws-amplify";
import { withAuthenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import config from "./src/aws-exports";

Amplify.configure(config);
const userSelector = (context) => [context.user]


const App = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const { user, signOut } = useAuthenticator(userSelector);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);
  

  return (
    <View style={styles.barcodebox}>
      <Pressable onPress={signOut} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Sign out!</Text>
      </Pressable>
      <Barcode />
    </View>
  );
};

const styles = StyleSheet.create({
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    width: '100%',
    overflow: "hidden",
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
    top: 100,
    left: 100,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});

export default withAuthenticator (App);