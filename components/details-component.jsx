import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { OtherProduct } from './other-product-component';


export default function AnimationComponent({ hasProduct, hasTacc, setShowResult, setScanned }) {
  const translateY = useRef(new Animated.Value(1000)).current;
  const [height, setHeight] = useState('50%')
  
  const product = [{
    name: 'Pure 100%',
    brand: 'Tomattino',
    code: '123456789',  
    category: 'Pure',
  },
  {
    name: 'Digamosle Pure',
    brand: 'Zapallo',
    code: '223456789',  
    category: 'Pure',
  },
  {
    name: 'No se me ocurre nada',
    brand: 'Tomate',
    code: '22345679',  
    category: 'Pure',
  }];
  const [arrayProducts, setArrayProducts] = useState(product);


  useEffect(() => {
    const animationIn = Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });
    animationIn.start();

  }, [translateY]);
  
  function closeTab() {
    Animated.timing(translateY, {
      toValue: 1000,
      duration: 1000,
      useNativeDriver: true,
    }).start(close);
  }

  function close() {
    setShowResult(false)
    setScanned(false)
  }

  function showOtherProducts () {
    setHeight('80%')
    translateY.setValue(250)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height,
      }}
    >
      <Details
      hasProduct={hasProduct}
      closeTab={closeTab}
      hasTacc={hasTacc}
      showOtherProducts = {showOtherProducts}
      arrayProducts = {arrayProducts}
      />
    </Animated.View>
  );
};



export function Details ({hasProduct, hasTacc, closeTab, showOtherProducts, arrayProducts}) {
  const translateY = useRef(new Animated.Value(1000)).current;
  let [showMoreProducts, setshowMoreProducts] = useState(false)
  handleClick = () =>{
    closeTab()
  }

  function handleOpenMoreProducts () {
    showOtherProducts();
    setshowMoreProducts(true)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  
  return (
    <View style={styles.root}>
      <View style={styles.formkitDown} onTouchEnd={handleClick}>
        <Icon name="angle-down" size={35} />
      </View>
      <View style={styles.frame14}>
        <Text style={styles.texto}>Producto : {hasProduct.name}</Text>
        <Text style={styles.texto}>Marca : {hasProduct.brand}</Text>
        <Text style={styles.texto}>Barcode : {hasProduct.code}</Text>
        <Text style={styles.texto}>Categoría : {hasProduct.category}</Text>
        <Text style={styles.texto}>Apto : {hasTacc ? "NO" : "SI"}</Text>
      </View>
      {!showMoreProducts ?
      <View style={styles.frame15} onTouchEnd={handleOpenMoreProducts}>
        <View style={styles.frame16}>
          <Icon name="search" size={20} />
          <Text style={styles.buscarProductosAptos} >{hasTacc ? 'Buscar productos aptos' : 'Buscar productos similares'}</Text>
        </View> 
      </View>
      :  
        <Animated.View
        style={{
          transform: [{ translateY }],
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
        }}
        >
          <View style = {styles.frame14}>
            <Text style ={styles.texto} >Productos aptos similares:</Text>
            {arrayProducts.map((product) => (
              <OtherProduct key={product.code} data={product} />
            ))}
          </View>
      </Animated.View>
        }
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
    padding: 7,
    gap: 5,
  },
  frame15: {
    flex:2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical:50
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