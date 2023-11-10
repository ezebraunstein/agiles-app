import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { OtherProduct } from './other-product-component';
import AWS from "aws-sdk";
import { useFilter } from './context';


export default function AnimationComponent({ hasProduct, setShowResult, setScanned }) {
  const translateY = useRef(new Animated.Value(1000)).current;
  const [height, setHeight] = useState('50%')
  const docClient = new AWS.DynamoDB.DocumentClient();
  const { selectedFilter } = useFilter();

  const [arrayProducts, setArrayProducts] = useState([]);

  const fetchProductsInformation = async () => {
    return new Promise((resolve, reject) => {
      // const params = {
      //   TableName: "Product-qarcfxr6avge5pqqxdgi75roxi-staging",
      //   FilterExpression: "category = :category AND hasTacc = :hasTacc AND NOT code = :code",
      //   ExpressionAttributeValues: {
      //     ":category": hasProduct.category,
      //     ":hasTacc": false,
      //     ":code": hasProduct.code,
      //   },
      // };
      let filterExpression = "category = :category AND NOT code = :code";
      let expressionAttributeValues = {
        ":category": hasProduct.category,
        ":code": hasProduct.code,
      };

      switch (selectedFilter) {
        case '1': // TACC
          filterExpression += " AND hasTacc = :hasTacc";
          expressionAttributeValues[":hasTacc"] = false;
          break;
        case '2': // Vegan
          filterExpression += " AND hasVegan = :hasVegan";
          expressionAttributeValues[":hasVegan"] = false;
          break;
        case '3': // Lactose-Free
          filterExpression += " AND hasLactose = :hasLactose";
          expressionAttributeValues[":hasLactose"] = false;
          break;
      }

      const params = {
        TableName: "Product-qarcfxr6avge5pqqxdgi75roxi-staging",
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues,
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

  async function showOtherProducts() {
    setHeight('80%')
    translateY.setValue(250)
    const products = await fetchProductsInformation();
    setArrayProducts(products.Items)
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
        // hasTacc={hasTacc}
        isProductApt={hasProduct.isProductApt}
        selectedFilter={selectedFilter}
        showOtherProducts={showOtherProducts}
        arrayProducts={arrayProducts}
      />
    </Animated.View>
  );
};



export function Details({ hasProduct, isProductApt, selectedFilter, closeTab, showOtherProducts, arrayProducts }) {
  const translateY = useRef(new Animated.Value(1000)).current;
  let [showMoreProducts, setshowMoreProducts] = useState(false)
  handleClick = () => {
    closeTab()
  }

  function handleOpenMoreProducts() {
    showOtherProducts();
    setshowMoreProducts(true)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  let aptoText = '';
  switch (selectedFilter) {
    case '1': // TACC
      aptoText = isProductApt ? "Libre de Gluten" : "Contiene Gluten";
      break;
    case '2': // Vegan
      aptoText = isProductApt ? "Apto Vegano" : "No Apto Vegano";
      break;
    case '3': // Lactose-Free
      aptoText = isProductApt ? "Libre de Lactosa" : "Contiene Lactosa";
      break;
    default:
      aptoText = "Información no disponible";
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
        <Text style={styles.texto}>Apto : {aptoText}</Text>
      </View>
      {!showMoreProducts ?
        <View style={styles.frame15} onTouchEnd={handleOpenMoreProducts}>
          <View style={styles.frame16}>
            <Icon name="search" size={20} />
            <Text style={styles.buscarProductosAptos} >{'Buscar productos aptos'}</Text>
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
          <View style={styles.frame14}>
            <Text style={styles.texto} >Productos aptos similares:</Text>
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
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 50
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
    gap: 10
  },
  buscarProductosAptos: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 29,
  },
});