import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import RenderHtml from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GenerateRecipeScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: string }[]
  >([]);
  const [recipeHtml, setRecipeHtml] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddIngredient = () => {
    if (ingredientName && ingredientQuantity) {
      setIngredients([
        ...ingredients,
        { name: ingredientName, quantity: ingredientQuantity },
      ]);
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      Alert.alert("Error", "Please add at least one ingredient.");
      return;
    }

    setLoading(true);
    const prompt = `Create 1-2 eco-friendly recipes using these ingredients: ${JSON.stringify(
      { ingredients }
    )}. If any ingredient is not environmentally friendly or its cooking process harms the planet, skip it and suggest sustainable alternatives. 🌱 Use emojis wherever appropriate! Also, include eco-friendly tips for preparation.  

If certain ingredients conflict—whether for human health or environmental impact—handle the issue carefully. Prioritize the main (hero) ingredient and omit the conflicting one.  

This response is crucial for both human well-being and the environment, so proceed thoughtfully.Give a clear warning in a seprate Section what should not be done.Need not that a recipe should all the above ingedients some can be missed. Return the response in HTML format.`;

    try {
      console.log(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`, // Replace with your Gemini API key
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the response text
      const responseText = response.data.candidates[0].content.parts[0].text;
      setRecipeHtml(responseText);
    } catch (error) {
      console.error("Error generating recipe:", error);
      Alert.alert("Error", "Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!recipeHtml) {
      Alert.alert("Error", "No recipe to save.");
      return;
    }

    try {
      const newRecipe = {
        id: Date.now().toString(),
        html: recipeHtml,
        date: new Date().toLocaleDateString(),
      };

      // Save recipe to AsyncStorage
      const savedRecipes = await AsyncStorage.getItem("savedRecipes");
      const recipes = savedRecipes ? JSON.parse(savedRecipes) : [];
      recipes.push(newRecipe);
      await AsyncStorage.setItem("savedRecipes", JSON.stringify(recipes));

      Alert.alert("Success", "Recipe saved successfully!");
      navigation.pop();
    } catch (error) {
      console.error("Error saving recipe:", error);
      Alert.alert("Error", "Failed to save recipe.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Add Ingredients</Text>
        <TextInput
          placeholder="Ingredient Name"
          value={ingredientName}
          onChangeText={setIngredientName}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantity"
          value={ingredientQuantity}
          onChangeText={setIngredientQuantity}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddIngredient}
        >
          <Text style={styles.addButtonText}>Add Ingredient</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Ingredients List</Text>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredientItem}>
            {item.name} - {item.quantity}
          </Text>
        ))}

        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerateRecipe}
          disabled={loading}
        >
          <Text style={styles.generateButtonText}>
            {loading ? "Generating..." : "Generate Recipe"}
          </Text>
        </TouchableOpacity>

        {recipeHtml ? (
          <>
            <RenderHtml
              contentWidth={300}
              source={{ html: recipeHtml }}
              tagsStyles={{
                h2: { fontSize: 18, fontWeight: "bold", color: "#333" },
                ul: { marginBottom: 10 },
                ol: { marginBottom: 10 },
                p: { fontSize: 14, color: "#666" },
              }}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveRecipe}
            >
              <Text style={styles.saveButtonText}>Save Recipe</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ingredientItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  generateButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  generateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GenerateRecipeScreen;
