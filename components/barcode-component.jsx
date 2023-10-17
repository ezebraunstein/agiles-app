import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import AWS from "aws-sdk";
import { Text, View, Button, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AnimationComponent from "./details-component";

const { REACT_APP_ACCESS_KEY, REACT_APP_SECRET_ACCESS_KEY } = Constants.expoConfig.extra;

AWS.config.update({
  region: "us-east-1",
  accessKeyId: REACT_APP_ACCESS_KEY,
  secretAccessKey: REACT_APP_SECRET_ACCESS_KEY,
});

export const Barcode = () => {

  const docClient = new AWS.DynamoDB.DocumentClient();
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [tacc, setTacc] = useState(false);
  const [productData, setProductData] = useState(null);
  const [hasProduct, setHasProduct] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const fetchProductInformation = async (code) => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: "Product-qarcfxr6avge5pqqxdgi75roxi-staging",
        FilterExpression: "code = :code",
        ExpressionAttributeValues: {
          ":code": code,
        },
      };

      docClient.scan(params, (err, items) => {
        if (err) {
          console.error(
            "Unable to scan the table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  };

  const handleBarCodeScanned = async ({ type, data }) => {

    setScanned(true);
    setHasProduct(null);
    setText(data);

    console.log("Type: " + type + "\nData: " + data);

    try {

      const items = await fetchProductInformation(data);

      if (items.Count === 1) {
        if (items.Items[0].hasTacc) {
          setTacc(true);
        } else {
          setTacc(false);
        }

        // setProductData({
        //   name: items.Items[0].name,
        //   brand: items.Items[0].brand,
        //   category: items.Items[0].category,
        //   code: items.Items[0].code
        // });

        setHasProduct({
          name: items.Items[0].name,
          brand: items.Items[0].brand,
          category: items.Items[0].category,
          code: items.Items[0].code
        });

      }

      // const itemEncontrado = items.find(item => item.Id == data);
      // if (itemEncontrado) {
      //   console.log("Scan succeeded. Data:", itemEncontrado);
      //   setHasProduct(itemEncontrado);
      // }

      setShowResult(true);
      setTimeout(() => {
        if (!hasProduct) {
          setShowResult(false);
          setScanned(false);
        }
      }, 1500);
    } catch (err) {
      console.error("Error fetching information:", err);
    }
  };

  const onPressOutside = () => {
    setScanned(false);
    setHasProduct(null);
    setShowResult(false);
  };

  const ResultOverlay = () => {
    if (!showResult) return null;

    let backgroundColor, icon, text;

    if (hasProduct) {
      return <AnimationComponent hasProduct={hasProduct} hasTacc={tacc} setShowResult={setShowResult} setScanned={setScanned} />
    } else {
      backgroundColor = "rgba(255, 255, 0, 0.6)";
      text = "No reconocido";
    }

    return (
      <View style={[styles.overlay, { backgroundColor }]}>
        {icon && <Text style={styles.overlayIcon}>{icon}</Text>}
        <Text style={styles.overlayText}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.barcodebox}>
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: '100%', width: '100%' }}
        />
      </TouchableWithoutFeedback>
      <ResultOverlay />
    </View>
  )
}

const styles = StyleSheet.create({
  barcodebox: {
    height: '100%',
    width: '100%'
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayIcon: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#fff",
  },
  overlayText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
})