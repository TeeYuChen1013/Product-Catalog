import { FlatList, Image, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


// Product detail in Product List Screen
type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}; 

type RootStackParamList = {
  Home: undefined;
  ProductDetailScreen: { id: number };
};
  
function ProductListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  // Fetch products from the DummyJSON API
  useEffect(() => {
  fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`)
    .then(response => response.json())
    .then(data => {
      setProducts(currentProducts => [...currentProducts, ...data.products]);
    });
    }, [skip]);

  return ( 
    // Product Catalog list   
    <View>
      <View>
        
        <Text style={{ fontSize: 20, textAlign: 'center', padding: 20, fontWeight: 'bold' }}>
          Product Catalog
        </Text>

      </View>

      {/* Display the product list in a FlatList*/}
      <FlatList 
          data={products}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
              <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 100 }} />
              <Text>RM {item.price}</Text>
              <Button 
                title="View Details"
                onPress={() => {
                  // Navigate to product detail screen
                  navigation.navigate('ProductDetailScreen', { id: item.id });
                }}
              />
            </View>
          )}

          // Add pagination to the product list each time scroll to end will loading 10 more products 
          onEndReached={() => {
            if (!loadMore && skip < products.length) {
              setLoadMore(true);
              setLoading(true);  
              setTimeout(() => {
                setSkip(skip + 10);
                setLoading(false);
                setLoadMore(false); 
              }, 1500);
            }
          }}
          
          // Display loading text at bottom when loading more products
          ListFooterComponent={
            loading ? (
                <Text style={{ flex: 1,textAlign: 'center', fontSize: 20, padding: 20 }}>
                  Load More Products...
                </Text>
            ) : undefined
          }
        />

          
      </View>
  );
}

export default ProductListScreen;