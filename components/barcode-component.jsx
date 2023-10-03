import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";


export const Barcode = () => {
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [hasProduct, setHasProduct] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    try {
      const items = [{ Id: '77980229', tacc: 'true' }, { Id: '77995681', tacc: 'true' }, { Id: '77969071', tacc: 'false' }, { Id: '7798101201909', tacc: 'false' }];
      const itemEncontrado = items.find(item => item.Id == data);
      if (itemEncontrado) {
        console.log("Scan succeeded. Data:", items);
        setHasProduct(itemEncontrado);
      }

      setShowResult(true);
      setTimeout(() => {
        setScanned(false);
        setHasProduct(null);
        setShowResult(false);
      }, 1000);
    } catch (err) {
      console.error("Error fetching information:", err);
    }
  };

  const ResultOverlay = () => {
    if (!showResult) return null;

    let backgroundColor, icon, text;

    if (hasProduct) {
      if (hasProduct.tacc === 'true') {
        backgroundColor = "rgba(255, 0, 0, 0.7)";
        icon = "✕";
        text = "Contiene Gluten";
      } else {
        backgroundColor = "rgba(0, 255, 0, 0.7)";
        icon = "✓";
        text = "Libre de Gluten";
      }
    } else {
      backgroundColor = "rgba(255, 255, 0, 0.7)";
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: '100%', width: '100%' }}
      />
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