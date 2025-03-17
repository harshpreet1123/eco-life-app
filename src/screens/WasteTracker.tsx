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
import { MaterialIcons } from "@expo/vector-icons";

const WasteReductionTracker: React.FC = () => {
  const [wasteGenerated, setWasteGenerated] = useState("");
  const [recyclingPercentage, setRecyclingPercentage] = useState("");
  const [composting, setComposting] = useState("");

  const calculateWasteImpact = () => {
    const totalWaste = parseFloat(wasteGenerated || "0");
    const recycledWaste = totalWaste * (parseFloat(recyclingPercentage || "0") / 100);
    const compostedWaste = composting === "yes" ? totalWaste * 0.2 : 0; // 20% composting assumption
    const landfillWaste = totalWaste - recycledWaste - compostedWaste;

    return { totalWaste, recycledWaste, compostedWaste, landfillWaste };
  };

  const getWasteReductionTips = () => {
    const tips = [];
    if (parseFloat(recyclingPercentage || "0") < 50) {
      tips.push("♻️ Increase recycling efforts to reduce landfill waste.");
    }
    if (composting === "no") {
      tips.push("🌱 Start composting to reduce organic waste.");
    }
    if (parseFloat(wasteGenerated || "0") > 5) {
      tips.push("🗑️ Reduce waste generation by avoiding single-use items.");
    }
    return tips.length > 0 ? tips : ["🎉 Great job! Your waste management is efficient."];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <Text style={styles.headerTitle}>Waste Reduction Tracker</Text>
        <Text style={styles.headerSubtitle}>Track your waste and recycling habits</Text>
      </LinearGradient>

      {/* Waste Inputs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Waste Management</Text>
        <InputField
          label="Waste Generated (kg/week)"
          value={wasteGenerated}
          onChangeText={setWasteGenerated}
          icon="delete"
        />
        <InputField
          label="Recycling Percentage (%)"
          value={recyclingPercentage}
          onChangeText={setRecyclingPercentage}
          icon="recycling"
        />
        <InputField
          label="Composting (yes/no)"
          value={composting}
          onChangeText={setComposting}
          icon="compost"
        />
      </View>

      {/* Calculate Button */}
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={() => {
          const { totalWaste, recycledWaste, compostedWaste, landfillWaste } = calculateWasteImpact();
          alert(
            `Total Waste: ${totalWaste.toFixed(2)} kg\n` +
            `Recycled Waste: ${recycledWaste.toFixed(2)} kg\n` +
            `Composted Waste: ${compostedWaste.toFixed(2)} kg\n` +
            `Landfill Waste: ${landfillWaste.toFixed(2)} kg`
          );
        }}
      >
        <Text style={styles.calculateButtonText}>Calculate Waste Impact</Text>
      </TouchableOpacity>

      {/* Tips Section */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Waste Reduction Tips</Text>
        {getWasteReductionTips().map((tip, index) => (
          <Text key={index} style={styles.tipText}>
            {tip}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const InputField = ({ label, value, onChangeText, icon }) => (
  <View style={styles.inputContainer}>
    <MaterialIcons name={icon} size={20} color="#4CAF50" style={styles.inputIcon} />
    <TextInput
      style={styles.input}
      placeholder={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
      placeholderTextColor="#999"
    />
  </View>
);

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
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#333",
  },
  calculateButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  tipsContainer: {
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
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

export default WasteReductionTracker;