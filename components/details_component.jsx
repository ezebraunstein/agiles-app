import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Vector from '../assets/vectors/flecha.svg';
import IcBaselineSearch from '../assets/vectors/lupa.svg';

export const Details = () => {
  return (
    <View style={styles.root}>
      <View style={styles.formkitDown}>
      </View>
      <View style={styles.frame14}>
        <Text style={styles.productoLoremIpsum}>Producto : Lorem Ipsum</Text>
        <Text style={styles.marcaLoremIpsum}>Marca : Lorem Ipsum</Text>
        <Text style={styles.barcodeXxxxxxxx}>Barcode : XXXXXXXX</Text>
        <Text style={styles.tipoLoremIpsum}>Tipo : Lorem Ipsum</Text>
      </View>
      <View style={styles.frame15}>
        <View style={styles.frame16}>
          <Text style={styles.buscarProductosAptos}>Buscar productos aptos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, // Use flex: 1 to fill the available space
    backgroundColor: '#FFF',
  },
  formkitDown: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  productoLoremIpsum: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 27, // Adjust line height as needed
  },
  marcaLoremIpsum: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 27, // Adjust line height as needed
  },
  barcodeXxxxxxxx: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 27, // Adjust line height as needed
  },
  tipoLoremIpsum: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 27, // Adjust line height as needed
  },
  frame14: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  frame15: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame16: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 20,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buscarProductosAptos: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 29, // Adjust line height as needed
  },
});