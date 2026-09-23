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