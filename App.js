import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Barcode } from "./components/barcode-component";
import Constants from "expo-constants";
import AWS from "aws-sdk";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Details } from "./components/details-component";

/* const { ACCESS_KEY, SECRET_ACCESS_KEY } = Constants.manifest.extra;

AWS.config.update({
  region: "us-east-1",
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}); */

export default function App() {
  
  const [hasPermission, setHasPermission] = useState(null);
  const docClient = new AWS.DynamoDB.DocumentClient();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // const fetchTicketInformation = async (ticketId) => {
  //   return new Promise((resolve, reject) => {
  //     const params = {
  //       TableName: "Ticket-zn4tkt5eivea5af5egpjlychcm-dev",
  //       FilterExpression: "id = :id",
  //       ExpressionAttributeValues: {
  //         ":id": ticketId,
  //       },
  //     };

  //     docClient.scan(params, (err, items) => {
  //       if (err) {
  //         console.error(
  //           "Unable to scan the table. Error JSON:",
  //           JSON.stringify(err, null, 2)
  //         );
  //         reject(err);
  //       } else {
  //         resolve(items);
  //       }
  //     });
  //   });
  // };

  

  return (
    <View style={styles.barcodebox}>
        <Barcode/>
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