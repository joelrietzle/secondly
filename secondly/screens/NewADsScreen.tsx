import { useEffect, useState } from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';

//Initilazing the SDK
Parse.setAsyncStorage(AsyncStorage);

Parse.initialize('KqcMnSgu3r4ilX63oHlwwHkWljlAYxdwU5Mzuonf', 'Dtz0erT2HNqjDZaL5fIA8r835BhBkAnpfRJA5Rqt', 'i1UMKrDHlMxUlTkmUP6MyxlXl8qGlxs0V4u9YKGW');
Parse.serverURL= 'https://parseapi.back4app.com/';

export default function NewADsScreen() {

  async function addProduct() {
    try {
      const newProduct = new Parse.Object('Product');
      // Define the attributes that we want for the product
      newProduct.set('name', 'Sofa');
      newProduct.set('price', '499');

      await newProduct.save();
      console.log('Product saved');
      console.log('PARSE', Parse);
    }
    catch (error) {
      console.log('Error saving new product', error);
    }
  }

  const [product, setProduct] = useState(new Parse.Object('Product'));

  async function fetchNewProduct() {
    //create a Parse query to using the product class created
    let query = new Parse.Query('Product');
    //run the query to retrieve all objects on Product class 
    let queryResult = await query.find();
    const currentProduct = queryResult[0];

    console.log('product id', currentProduct.get('id'));
    console.log('product name', currentProduct.get('name'));
    console.log('product price', currentProduct.get('price'));
    setProduct(currentProduct);

  }

  useEffect(() => {
    fetchNewProduct()
  }, []);

  return (
    <View style={styles.container}>
      <Text>Name: {product.get('name')}</Text>
      <Text>Price: {product.get('price')}</Text>
      <EditScreenInfo path="/screens/NewADsScreen.tsx" />
      <Button title = 'Add Product' onPress={addProduct} />
      <Button title ='Fetch Product' onPress={fetchNewProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
