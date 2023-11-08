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
      {/* <Pressable onPress={signOut} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Sign out!</Text>
      </Pressable> */}
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
    backgroundColor: 'red',
    paddingHorizontal: 8,
    position: 'absolute',
    borderRadius: 10,
    top: '6%',
    right: '5%',
    zIndex: 1,
  },
  buttonText: { color: 'white', padding: 15, fontSize: 18 },
});

export default withAuthenticator(App);