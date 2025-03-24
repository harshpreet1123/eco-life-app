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

const EcoTravelPlanner: React.FC = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelOptions, setTravelOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const sampleJson = {
    source: "New York",
    destination: "Los Angeles",
    options: [
      {
        mode: "Train",
        steps: [
          "Take Amtrak from New York Penn Station to Los Angeles Union Station.",
          "Travel time: Approximately 70 hours.",
          "Estimated CO2 emissions: 50 kg.",
        ],
      },
      {
        mode: "Bus",
        steps: [
          "Take a Greyhound bus from New York to Los Angeles.",
          "Travel time: Approximately 45 hours.",
          "Estimated CO2 emissions: 60 kg.",
        ],
      },
      {
        mode: "Flight (with carbon offset)",
        steps: [
          "Book a flight from JFK to LAX with a carbon offset program.",
          "Travel time: Approximately 6 hours.",
          "Estimated CO2 emissions: 200 kg (offset included).",
        ],
      },
    ],
  };

  const fetchEcoTravelOptions = async () => {
    if (!source || !destination) {
      alert("Please enter both source and destination.");
      return;
    }

    setLoading(true);

    try {
      const prompt = `I want to travel from ${source} to ${destination}. Give me all the steps in a well-formatted JSON format only like ${JSON.stringify(
        sampleJson
      )} on how to travel in an eco-friendly way.`;
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

      // Clean the response text to extract valid JSON
      const jsonStartIndex = responseText.indexOf("[");
      const jsonEndIndex = responseText.lastIndexOf("]") + 1;
      const jsonString = responseText.slice(jsonStartIndex, jsonEndIndex);

      // Parse the cleaned JSON string
      const data = JSON.parse(jsonString);
      setTravelOptions(data);
    } catch (error) {
      console.error("Error fetching travel options:", error);
      alert("Failed to fetch travel options. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <Text style={styles.headerTitle}>Eco-Friendly Travel Planner</Text>
        <Text style={styles.headerSubtitle}>
          Plan your journey with minimal environmental impact
        </Text>
      </LinearGradient>

      {/* Input Fields */}
      <View style={styles.section}>
        <TextInput
          style={styles.input}
          placeholder="Source (e.g., New York)"
          value={source}
          onChangeText={setSource}
        />
        <TextInput
          style={styles.input}
          placeholder="Destination (e.g., Los Angeles)"
          value={destination}
          onChangeText={setDestination}
        />
      </View>

      {/* Fetch Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={fetchEcoTravelOptions}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Fetching..." : "Get Eco-Friendly Travel Options"}
        </Text>
      </TouchableOpacity>

      {/* Display Travel Options */}
      {travelOptions.length > 0 && !loading && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Eco-Friendly Travel Options</Text>
          {travelOptions.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <Text style={styles.optionTitle}>{option.mode}</Text>
              {option.steps.map((step: string, stepIndex: number) => (
                <Text key={stepIndex} style={styles.optionStep}>
                  {step}
                </Text>
              ))}
            </View>
          ))}
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
  optionContainer: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  optionStep: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

export default EcoTravelPlanner;
