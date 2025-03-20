import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

const ProductDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { product } = route.params;

  const handleBuyNow = (link) => {
    Linking.openURL(link);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.productRating}>⭐ {product.rating}</Text>
        <Text style={styles.sectionHeader}>Why to Buy</Text>
        <Text style={styles.whyToBuy}>{product.whyToBuy}</Text>
        <Text style={styles.sectionHeader}>Where to Buy</Text>
        {product.whereToBuy.map((store, index) => (
          <TouchableOpacity
            key={index}
            style={styles.buyButton}
            onPress={() => handleBuyNow(store.link)}
          >
            <Text style={styles.buyButtonText}>Buy on {store.name}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.sectionHeader}>Reviews</Text>
        {product.reviews.map((review, index) => (
          <View key={index} style={styles.reviewItem}>
            <Text style={styles.reviewUser}>{review.user}</Text>
            <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#4CAF50",
    marginBottom: 10,
  },
  productRating: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  whyToBuy: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reviewItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reviewRating: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
  },
});

export default ProductDetailScreen;