import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import EcoLoader from "../components/EcoLoader";
import RenderHTML from "react-native-render-html";

const SustainableDietPlanner: React.FC = () => {
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [healthGoal, setHealthGoal] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [dietPlan, setDietPlan] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dietPlanHtml, setDietPlanHtml] = useState("");

  const fetchSustainableDietPlan = async () => {
    if (!dietaryPreference || !healthGoal) {
      alert("Please fill in your dietary preference and health goal.");
      return;
    }

    setLoading(true);

    try {
      const prompt = `Create a sustainable diet plan for someone with the following details:
        - Dietary Preference: ${dietaryPreference}
        - Health Goal: ${healthGoal}
        - Restrictions: ${restrictions || "None"}
        
        Provide the plan in a well-structured HTML format with emojis to make it engaging. Include meal ideas, snacks, and tips for sustainability. Use <h3> for headings, <ul> and <li> for lists, and <p> for paragraphs.`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, // Replace with your Gemini API key
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

      // Split the response into an array of lines for better display
      //   const planLines = responseText.split("\n").filter((line: string) => line.trim() !== "");
      //   setDietPlan(planLines);
      setDietPlanHtml(responseText);
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      alert("Failed to fetch diet plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <Text style={styles.headerTitle}>Sustainable Diet Planner 🌱</Text>
        <Text style={styles.headerSubtitle}>
          Plan your meals sustainably and achieve your health goals!
        </Text>
      </LinearGradient>

      {/* Input Fields */}
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Dietary Preference (e.g., Vegetarian, Vegan)"
          value={dietaryPreference}
          onChangeText={setDietaryPreference}
        />
        <TextInput
          style={styles.input}
          placeholder="Health Goal (e.g., Weight Loss, Muscle Gain)"
          value={healthGoal}
          onChangeText={setHealthGoal}
        />
        <TextInput
          style={styles.input}
          placeholder="Restrictions (e.g., Gluten-Free, Nut-Free)"
          value={restrictions}
          onChangeText={setRestrictions}
        />
      </View>

      {/* Fetch Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={fetchSustainableDietPlan}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Generating..." : "Get Sustainable Diet Plan"}
        </Text>
      </TouchableOpacity>

      {/* Display Diet Plan */}
      {/* {dietPlan.length > 0 && !loading && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Your Sustainable Diet Plan 🌿</Text>
          {dietPlan.map((line, index) => (
            <Text key={index} style={styles.planLine}>
              {line}
            </Text>
          ))}
        </View>
      )} */}
      {dietPlanHtml && !loading && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Your Sustainable Diet Plan 🌿</Text>
          <RenderHTML
            contentWidth={300} // Adjust based on your layout
            source={{ html: dietPlanHtml }}
          />
        </View>
      )}
      {loading && <EcoLoader />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  resultsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  planLine: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});

export default SustainableDietPlanner;
