import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, Text, Button } from 'react-native';
import { Flecha } from '../icons/flechaIcon'
import { Lupa } from '../icons/lupaIcon'

export default function AnimationComponent({ hasProduct, hasTacc, setShowResult, setScanned }) {
  const translateY = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    const animationIn = Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });

    animationIn.start();
    return () => {
      const animationOut = Animated.timing(translateY, {
        toValue: 1000,
        duration: 1000,
        useNativeDriver: true,
      });
      
      animationOut.start();
    };
  }, [translateY]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
      }}
    >
      <Details
      hasProduct={hasProduct}
      setShowResult={setShowResult}
      setScanned={setScanned}
      hasTacc={hasTacc}
      />
    </Animated.View>
  );
};



export function Details ({hasProduct, hasTacc, setShowResult, setScanned}) {
  
  handleClick = () =>{
    setShowResult(false);
    setScanned(false);
  }
  
  return (
    <View style={styles.root}>
      <View style={styles.formkitDown} onTouchEnd={handleClick}>
        <Flecha/>
      </View>
      <View style={styles.frame14}>
        <Text style={styles.texto}>Producto : {hasProduct.name}</Text>
        <Text style={styles.texto}>Marca : {hasProduct.brand}</Text>
        <Text style={styles.texto}>Barcode : {hasProduct.code}</Text>
        <Text style={styles.texto}>Categoría : {hasProduct.category}</Text>
        <Text style={styles.texto}>Apto : {hasTacc ==  true ? "NO" : "SI"}</Text>
      </View>
      <View style={styles.frame15}>
        <View style={styles.frame16}>
          <Lupa/>
          <Text style={styles.buscarProductosAptos}>Buscar productos aptos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, 
    backgroundColor: '#FFF',
  },
  formkitDown: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  texto: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 27, 
  },
  frame14: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  frame15: {
    flex:2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical:30
  },
  frame16: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap:10
  },
  buscarProductosAptos: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 29, 
  },
});