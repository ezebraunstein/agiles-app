import {StyleSheet, View, Text} from 'react-native';

export const OtherProduct = ({data}) =>{
  return (
    <View style={styles.root}>
      <Text style={styles.texto}>
        Producto : {data.name}
      </Text>
      <Text style={styles.texto}>
        Marca : {data.brand}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 373,
    height: 114,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderWidth: 1,
    borderColor: '#727272',
    borderStyle: 'solid',
    flexDirection: 'column',
    borderRadius: 20,
  },
  texto: {
    width: 323,
    flexShrink: 0,
    color: '#000',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 29,
  },
});
