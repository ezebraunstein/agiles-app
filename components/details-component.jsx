import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text, Button } from 'react-native';
import { Flecha } from '../icons/flechaIcon'


class AnimationComponent extends Component{
  constructor() {
    super();
    this.state = {
      translateY: new Animated.Value(1000),
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.translateY,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }
  
  componentWillUnmount() {
    Animated.timing(
      this.state.translateY,
      {
        toValue: 1000, 
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }


  render() {
    const { translateY } = this.state;
    return (
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%', // Ocupa la mitad de la pantalla
        }}
      >
        <Details hasProduct={this.props.hasProduct} setHasProduct={this.props.setHasProduct} setScanned={this.props.setScanned}/>
      </Animated.View>
    );
  }
}

export default AnimationComponent;


export function Details({hasProduct, setHasProduct, setScanned}) {
  handleClick = () =>{
    console.log(hasProduct)
    setHasProduct(null);
    setScanned(false);
  }
  return (
    <View style={styles.root}>
      <View style={styles.formkitDown} onTouchEnd={handleClick}>
        <Flecha/>
      </View>
      <View style={styles.frame14}>
        <Text style={styles.productoLoremIpsum}>Producto : {hasProduct.Nombre}</Text>
        <Text style={styles.marcaLoremIpsum}>Marca : {hasProduct.Marca}</Text>
        <Text style={styles.barcodeXxxxxxxx}>Barcode : {hasProduct.Id}</Text>
        <Text style={styles.tipoLoremIpsum}>Tipo : {hasProduct.Tipo}</Text>
        <Text style={styles.tipoLoremIpsum}>Apto : {hasProduct.Apto}</Text>
        
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
    flex: 1, 
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
    lineHeight: 27, 
  },
  marcaLoremIpsum: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 27, 
  },
  barcodeXxxxxxxx: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 27, 
  },
  tipoLoremIpsum: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 27, 
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
    lineHeight: 29, 
  },
});