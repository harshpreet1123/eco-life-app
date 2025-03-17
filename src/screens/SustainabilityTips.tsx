import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import EcoLoader from "../components/EcoLoader";

const SustainabilityTips: React.FC<any> = ({ navigation }) => {
  const [currentTip, setCurrentTip] = useState<{
    title: string;
    description: string;
  } | null>(null);

  // List of sustainability tips
  const tips = [
    {
      title: "🌱 Use Reusable Bags",
      description:
        "Carry reusable bags when shopping to reduce plastic waste. Single-use plastic bags take hundreds of years to decompose and harm marine life.",
    },
    {
      title: "💧 Save Water",
      description:
        "Fix leaky faucets and take shorter showers. Every drop counts! You can save up to 10 liters of water per minute by fixing leaks.",
    },
    {
      title: "🚲 Bike or Walk",
      description:
        "Choose biking or walking over driving for short distances. It reduces carbon emissions and improves your health.",
    },
    {
      title: "🍽️ Eat Less Meat",
      description:
        "Reduce meat consumption and opt for plant-based meals. Livestock farming is a major contributor to greenhouse gas emissions.",
    },
    {
      title: "♻️ Recycle Properly",
      description:
        "Separate recyclables from trash and follow local recycling guidelines. Recycling reduces landfill waste and conserves resources.",
    },
    {
      title: "🌞 Use Renewable Energy",
      description:
        "Switch to solar or wind energy for your home. Renewable energy sources are cleaner and more sustainable than fossil fuels.",
    },
    {
      title: "🌳 Plant Trees",
      description:
        "Plant trees in your community or support tree-planting initiatives. Trees absorb CO2 and provide oxygen.",
    },
    {
      title: "🚰 Avoid Single-Use Plastics",
      description:
        "Say no to single-use plastics like straws, cups, and cutlery. Opt for reusable alternatives instead.",
    },
    {
      title: "📦 Buy in Bulk",
      description:
        "Purchase items in bulk to reduce packaging waste. Bulk buying also saves money in the long run.",
    },
    {
      title: "🚗 Carpool or Use Public Transport",
      description:
        "Share rides or use public transportation to reduce your carbon footprint. Fewer cars on the road mean less pollution.",
    },
  ];

  // Pick a random tip when the screen loads
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <Text style={styles.headerTitle}>Sustainability Tip</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {currentTip && (
          <>
            <Text style={styles.tipTitle}>{currentTip.title}</Text>
            <Text style={styles.tipDescription}>{currentTip.description}</Text>
          </>
        )}
      </ScrollView>

      {/* Close Button */}
      <EcoLoader />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    flexGrow: 1,
    padding: 20,
  },
  tipTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  tipDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 15,
    margin: 20,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SustainabilityTips;
