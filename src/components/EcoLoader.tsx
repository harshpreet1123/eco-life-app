import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const EcoLoader: React.FC = () => {
  const [currentTip, setCurrentTip] = useState<{
    title: string;
    description?: string;
    suggestion?: string;
  } | null>(null);

  // List of eco-friendly tips and suggestions
  const tips = [
    {
      title: "🌱 Use Reusable Bags",
      description: "Carry reusable bags to reduce plastic waste.",
    },
    {
      title: "💧 Save Water",
      description: "Fix leaks and take shorter showers.",
    },
    {
      title: "🚲 Bike or Walk",
      description: "Choose biking or walking for short distances.",
    },
    {
      title: "🍽️ Eat Less Meat",
      description: "Opt for plant-based meals to reduce emissions.",
    },
    {
      title: "♻️ Recycle Properly",
      description: "Separate recyclables and follow local guidelines.",
    },
    {
      title: "🌞 Use Renewable Energy",
      description: "Switch to solar or wind energy at home.",
    },
    {
      title: "🌳 Plant Trees",
      description: "Support tree-planting initiatives.",
    },
    {
      title: "🚰 Avoid Single-Use Plastics",
      description: "Say no to straws, cups, and cutlery.",
    },
    {
      title: "📦 Buy in Bulk",
      description: "Reduce packaging waste by buying in bulk.",
    },
    {
      title: "🚗 Carpool or Use Public Transport",
      description: "Share rides or use public transport.",
    },
    {
      title: "💡 Use LED Bulbs",
      description: "Switch to energy-efficient LED lighting.",
    },
    {
      title: "🌍 Support Local Farmers",
      description: "Buy locally grown produce to reduce carbon footprint.",
    },
    {
      title: "📚 Read Eco-Friendly Books",
      suggestion: "Check out 'Silent Spring' by Rachel Carson.",
    },
    {
      title: "🎥 Watch Eco-Friendly Movies",
      suggestion: "Watch 'The Lorax' or 'An Inconvenient Truth'.",
    },
    {
      title: "🎶 Listen to Eco-Themed Songs",
      suggestion: "Listen to 'Earth Song' by Michael Jackson.",
    },
    {
      title: "📖 Read 'Braiding Sweetgrass'",
      suggestion: "A book about indigenous wisdom and ecology.",
    },
    {
      title: "🍃 Use Cloth Napkins",
      description: "Replace paper napkins with reusable cloth ones.",
    },
    {
      title: "🚮 Compost Food Waste",
      description: "Turn food scraps into nutrient-rich compost.",
    },
    {
      title: "🌿 Grow Your Own Herbs",
      description: "Start a small herb garden at home.",
    },
    {
      title: "📱 Use E-Tickets",
      description: "Opt for digital tickets to reduce paper waste.",
    },
    {
      title: "🛍️ Shop Second-Hand",
      description: "Buy used items to reduce demand for new products.",
    },
    {
      title: "🚿 Install Low-Flow Showerheads",
      description: "Save water with efficient showerheads.",
    },
    {
      title: "📉 Reduce Energy Consumption",
      description: "Unplug devices when not in use.",
    },
    {
      title: "🌾 Support Organic Farming",
      description: "Choose organic products to support sustainable farming.",
    },
    {
      title: "📺 Watch 'Our Planet'",
      suggestion:
        "A Netflix series highlighting Earth's beauty and challenges.",
    },
    {
      title: "🎧 Listen to 'Big Yellow Taxi'",
      suggestion: "A song by Joni Mitchell about environmental issues.",
    },
    {
      title: "📚 Read 'The Overstory'",
      suggestion: "A novel about trees and their importance.",
    },
    {
      title: "🍴 Use Reusable Cutlery",
      description: "Carry reusable utensils to avoid plastic ones.",
    },
    {
      title: "🚫 Avoid Fast Fashion",
      description: "Choose sustainable clothing brands.",
    },
    {
      title: "🌎 Celebrate Earth Day",
      description: "Participate in events to support the planet.",
    },
    {
      title: "📱 Use Eco-Friendly Apps",
      suggestion:
        "Try apps like 'Olio' for food sharing or 'Ecosia' for eco-friendly searches.",
    },
    {
      title: "🌱 Join a Community Garden",
      description: "Grow food and connect with your community.",
    },
    {
      title: "🚴‍♂️ Bike to Work",
      description: "Reduce emissions by biking instead of driving.",
    },
    {
      title: "📖 Read 'No One Is Too Small to Make a Difference'",
      suggestion: "A book by Greta Thunberg on climate action.",
    },
    {
      title: "🎥 Watch 'Before the Flood'",
      suggestion: "A documentary by Leonardo DiCaprio on climate change.",
    },
    {
      title: "🎶 Listen to 'Colors of the Wind'",
      suggestion: "A song from 'Pocahontas' about respecting nature.",
    },
    {
      title: "🌿 Use Natural Cleaning Products",
      description: "Switch to eco-friendly cleaning supplies.",
    },
    {
      title: "📱 Reduce Screen Time",
      description: "Save energy by reducing device usage.",
    },
    {
      title: "🌍 Support Environmental NGOs",
      description: "Donate to organizations fighting for the planet.",
    },
  ];

  // Pick a random tip when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setCurrentTip(tips[randomIndex]);
  }, []);

  // Animation for the loader
  const spinValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.gradient}>
        {/* Loader Animation */}
        <Animated.View
          style={[styles.loader, { transform: [{ rotate: spin }] }]}
        >
          <ActivityIndicator size="large" color="#fff" />
        </Animated.View>

        {/* Random Tip */}
        {currentTip && (
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>{currentTip.title}</Text>
            {currentTip.description && (
              <Text style={styles.tipDescription}>
                {currentTip.description}
              </Text>
            )}
            {currentTip.suggestion && (
              <Text style={styles.suggestion}>{currentTip.suggestion}</Text>
            )}
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  gradient: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  loader: {
    marginBottom: 20,
  },
  tipContainer: {
    alignItems: "center",
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  tipDescription: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 10,
  },
  suggestion: {
    fontSize: 14,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default EcoLoader;
