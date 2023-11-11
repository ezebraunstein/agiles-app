import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AnimationComponent from "./details-component";
import { MenuProfile } from "./profile-component";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFilter } from './context';
import AmplifyService from "../services/amplify_service";

export const Barcode = () => {
  const [scanned, setScanned] = useState(false);
  const [hasProduct, setHasProduct] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { selectedFilter } = useFilter();

  const handleBarCodeScanned = async ({ type, data }) => {

    setScanned(true);
    setHasProduct(null);

    console.log("Type: " + type + "\nData: " + data);

    try {

      const items = await AmplifyService.fetchProductInformation(data);

      if (items.Count === 1) {
        let isProductApt = false;
        switch (selectedFilter.value) {
          case '1': // TACC
            isProductApt = !items.Items[0].hasTacc;
            break;
          case '2': // Vegan
            isProductApt = !items.Items[0].hasVegan;
            break;
          case '3': // Lactose-Free
            isProductApt = !items.Items[0].hasLactose;
            break;
          default:
            isProductApt = false;
        }

        setHasProduct({
          name: items.Items[0].name,
          brand: items.Items[0].brand,
          category: items.Items[0].category,
          code: items.Items[0].code,
          isProductApt
        });
      }

      setShowResult(true);
      setTimeout(() => {
        if (!items.Items[0]) {
          setScanned(false);
          setShowResult(false);
        }
      }, 1500);
    } catch (err) {
      console.error("Error fetching information:", err);
    }
  };

  const handleAbrirMenu = () => {
    setShowMenu(true)
  }

  const ResultOverlay = () => {
    const translateY = useRef(new Animated.Value(300)).current;
    useEffect(() => {
      const animationIn = Animated.timing(translateY, {
        toValue: 150,
        duration: 600,
        useNativeDriver: true,
      });
      setTimeout(() => {
        animationIn.start();
      }, 500);
    }, [translateY]);
    if (!showResult) return null;

    let backgroundColor, icon, text;

    if (hasProduct) {
      switch (selectedFilter.value) {
        case '1': // TACC
          backgroundColor = hasProduct.isProductApt ? "rgba(0, 255, 0, 0.7)" : "rgba(255, 0, 0, 0.7)";
          icon = hasProduct.isProductApt ? "✓" : "✕";
          text = hasProduct.isProductApt ? "Libre de Gluten" : "Contiene Gluten";
          break;
        case '2': // Vegan
          backgroundColor = hasProduct.isProductApt ? "rgba(0, 255, 0, 0.7)" : "rgba(255, 0, 0, 0.7)";
          icon = hasProduct.isProductApt ? "✓" : "✕";
          text = hasProduct.isProductApt ? "Apto Vegano" : "No Apto Vegano";
          break;
        case '3': // Lactose-Free
          backgroundColor = hasProduct.isProductApt ? "rgba(0, 255, 0, 0.7)" : "rgba(255, 0, 0, 0.7)";
          icon = hasProduct.isProductApt ? "✓" : "✕";
          text = hasProduct.isProductApt ? "Libre de Lactosa" : "Contiene Lactosa";
          break;
        default:
          backgroundColor = "rgba(255, 255, 0, 0.6)";
          icon = "";
          text = "No reconocido";
      }
      return (
        <View style={[styles.overlay, { backgroundColor }]}>
          <Animated.View style={{
            transform: [{ translateY }],
            height: '100%',
            width: '100%'
          }}>
            {icon && <Text style={styles.overlayIcon}>{icon}</Text>}
            <Text style={styles.overlayText}>{text}</Text>
          </Animated.View>
          <AnimationComponent hasProduct={hasProduct} setShowResult={setShowResult} setScanned={setScanned} />
        </View>
      );
    } else {
      backgroundColor = "rgba(255, 255, 0, 0.6)";
      text = "No reconocido";
      return (
        <View style={[styles.overlay, { backgroundColor }]}>
          {icon && <Text style={styles.overlayIcon}>{icon}</Text>}
          <Text style={styles.overlayText}>{text}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.barcodebox}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: '100%', width: '100%' }}
      />
      <FontAwesome5 name="bars" size={35} onPress={handleAbrirMenu} style={styles.buttonContainer} />
      {showMenu && <MenuProfile setShowMenu={setShowMenu} />}
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
    textAlign: "center",
  },
  overlayText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    width: 40,
    top: 80,
    right: 30
  },
})