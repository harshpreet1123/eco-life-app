import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RenderHtml from "react-native-render-html";

const RecipeDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <RenderHtml
        contentWidth={300}
        source={{ html: recipe.html }}
        tagsStyles={{
          h2: { fontSize: 18, fontWeight: "bold", color: "#333" },
          ul: { marginBottom: 10 },
          ol: { marginBottom: 10 },
          p: { fontSize: 14, color: "#666" },
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});

export default RecipeDetailScreen;