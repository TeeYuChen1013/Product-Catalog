import { FlatList, Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

// Product detail in Product List Screen
  type Product = {
  title: string;
  price: number;
  thumbnail: string;
  }; 
  
function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  

  // Fetch products from the DummyJSON API
  useEffect(() => {
  fetch('https://dummyjson.com/products?limit=20&skip=0')
    .then(response => response.json())
    .then(data => {
      setProducts(data.products);
    });
    }, []);

  return ( 
    // Product Catalog list   
    <View>
      <View>
        <Text>Product Catalog</Text>
      </View>

      {/* Display the product list in a FlatList*/}
      <FlatList 
          data={products}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 100 }} />
              <Text>RM {item.price}</Text>
            </View>
          )}
      />
      </View>
  );
}

export default ProductListScreen;