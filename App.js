import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Barcode } from "./components/barcode-component";
import Constants from "expo-constants";
import AWS from "aws-sdk";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Details } from "./components/details-component";


export default function App() {

  const [hasPermission, setHasPermission] = useState(null);

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
      <Barcode />
      {/* <Details/> */}
      {/* {ResultOverlay()} */}
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
});