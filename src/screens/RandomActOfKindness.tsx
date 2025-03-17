import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const RandomActOfKindness: React.FC<any> = ({navigation}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [actOfKindness, setActOfKindness] = useState(
    "Compliment a stranger today. A simple smile or kind word can brighten someone's day!"
  );

  const handleDone = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
  };

  const handleWillDoIt = () => {
    navigation.pop(); // Navigate back to the previous screen
  };

  return (
    <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.actOfKindnessText}>{actOfKindness}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleWillDoIt}>
          <Text style={styles.buttonText}>Will Do It</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>

      {showConfetti && (
        <ConfettiCannon
          count={100}
          origin={{ x: 0, y: 0 }}
          explosionSpeed={100}
          autoStart
          fallSpeed={2000}
        //   containerStyle={styles.confettiContainer}
        />
      )}
    </LinearGradient>
  );
};

// Helper function to get a random act of kindness
const getRandomAct = () => {
  const acts = [
    "Donate old clothes to a charity.",
    "Leave a kind note for a coworker.",
    "Pay for someone's coffee in line behind you.",
    "Volunteer at a local shelter.",
    "Plant a tree in your neighborhood.",
  ];
  return acts[Math.floor(Math.random() * acts.length)];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  actOfKindnessText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    lineHeight: 36,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
});

export default RandomActOfKindness;