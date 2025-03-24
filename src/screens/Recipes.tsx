import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedRecipesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  // Fetch saved recipes from AsyncStorage
  const fetchSavedRecipes = async () => {
    const recipes = await AsyncStorage.getItem("savedRecipes");
    if (recipes) {
      setSavedRecipes(JSON.parse(recipes));
    }
  };

  // Refresh the list when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchSavedRecipes);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={savedRecipes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeItem}
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipe: item })
            }
          >
            <Text style={styles.recipeName}>Recipe - {item.date}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No saved recipes yet.</Text>
        }
      />
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("RecipeMaker")}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  recipeItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabIcon: {
    fontSize: 24,
    color: "#fff",
  },
});

export default SavedRecipesScreen;
