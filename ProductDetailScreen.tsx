import { Button, FlatList, Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

// Product detail in Product Detail Screen
type Product = {
    title: string;
    description: string;
    rating: number;
    price: number;
    images: string[];
  };

function ProductDetailScreen({ route, navigation }: { route: any; navigation: any }) {
    const { id } = route.params;
    const [product, setProduct] = useState<Product | null>(null);

    // Fetch products from the DummyJSON API
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(response => response.json())
            .then(data => {
            setProduct(data);
            });
    }, [id]);

     return (
        <View>
            <Text style={{ fontSize: 20, textAlign: 'center', padding: 20, fontWeight: 'bold' }}>
                Product Detail
            </Text>
            <View>
                <Button
                    title="Back To Product List"
                    onPress={() => navigation.goBack()}
                />

                {/* Product detail information */}
                {product && (
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{product.title}</Text>

                        <View
                            style={{
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />

                        <Image
                            source={{ uri: product.images[0] }}
                            style={{ width: 300, height: 300 }}
                        />

                        <View
                            style={{
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />

                        <Text style={{ fontSize: 14, lineHeight: 20 }}>{product.description}</Text>

                        <View
                            style={{
                                borderBottomWidth: 1,
                                marginVertical: 10,
                            }}
                        />

                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>RM {product.price.toFixed(2)}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'orange' }}>Rating: {product.rating}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export default ProductDetailScreen;