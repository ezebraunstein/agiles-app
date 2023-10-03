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
            const itemEncontrado = items.find(item => item.Id == data);
            if (itemEncontrado) {
                console.log("Scan succeeded. Data:", items);
                setHasProduct(itemEncontrado);
            }
        } catch (err) {
            console.error("Error fetching information:", err);
        }
    };

    const ResultOverlay = () => {
        if (validTicket === null || !showResult) return null;

        return (
            <View
                style={[
                    styles.overlay,
                    {
                        backgroundColor: validTicket
                            ? "rgba(0, 255, 0, 0.7)"
                            : "rgba(255, 0, 0, 0.7)",
                    },
                ]}
            >
                <Text style={styles.overlayText}>
                    {validTicket ? "✓ Valid" : "✕ Invalid"}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 500, width: 400 }}
                />
                {ResultOverlay()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 100,
    },

    barcodebox: {
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        width: 800,
        overflow: "hidden",
        borderRadius: 20,
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
    overlayText: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#fff",
    },
});