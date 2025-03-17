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
import { Menu, Divider, Provider } from "react-native-paper";

const WaterFootprintCalculator: React.FC = () => {
  const [showerDuration, setShowerDuration] = useState("");
  const [laundryLoads, setLaundryLoads] = useState("");
  const [dishwashingMethod, setDishwashingMethod] = useState("machine");
  const [gardenWatering, setGardenWatering] = useState("");
  const [toiletFlushes, setToiletFlushes] = useState("");
  const [faucetUsage, setFaucetUsage] = useState("");
  const [carWashes, setCarWashes] = useState("");
  const [dishwasherLoads, setDishwasherLoads] = useState("");
  const [leakage, setLeakage] = useState("");
  const [poolMaintenance, setPoolMaintenance] = useState("");

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [totalUsage, setTotalUsage] = useState<number | null>(null);

  const calculateWaterUsage = () => {
    const showerUsage = parseFloat(showerDuration || "0") * 10; // 10 liters per minute
    const laundryUsage = parseFloat(laundryLoads || "0") * 50; // 50 liters per load
    const dishwashingUsage = dishwashingMethod === "machine" ? 15 : 30; // 15 liters for machine, 30 for hand
    const gardenUsage = parseFloat(gardenWatering || "0") * 20; // 20 liters per session
    const toiletUsage = parseFloat(toiletFlushes || "0") * 6; // 6 liters per flush
    const faucetUsageTotal = parseFloat(faucetUsage || "0") * 5; // 5 liters per minute
    const carWashUsage = parseFloat(carWashes || "0") * 100; // 100 liters per car wash
    const dishwasherUsage = parseFloat(dishwasherLoads || "0") * 20; // 20 liters per load
    const leakageUsage = parseFloat(leakage || "0") * 10; // 10 liters per day (estimated)
    const poolUsage = parseFloat(poolMaintenance || "0") * 1000; // 1000 liters per month

    const totalDailyUsage =
      showerUsage +
      laundryUsage / 7 +
      dishwashingUsage +
      gardenUsage / 7 +
      toiletUsage +
      faucetUsageTotal +
      carWashUsage / 30 +
      dishwasherUsage +
      leakageUsage;

    const totalMonthlyUsage = totalDailyUsage * 30 + poolUsage;

    setTotalUsage(totalDailyUsage);
    return { totalDailyUsage, totalMonthlyUsage };
  };

  const getWaterSavingTips = () => {
    const tips = [];
    if (parseFloat(showerDuration || "0") > 10) {
      tips.push("💧 Reduce shower time to save water.");
    }
    if (parseFloat(laundryLoads || "0") > 3) {
      tips.push("🧺 Run full laundry loads to save water.");
    }
    if (dishwashingMethod === "hand") {
      tips.push("🍽️ Use a dishwasher (if available) to save water.");
    }
    if (parseFloat(gardenWatering || "0") > 3) {
      tips.push(
        "🌱 Water your garden in the early morning or late evening to reduce evaporation."
      );
    }
    if (parseFloat(leakage || "0") > 0) {
      tips.push("🚰 Fix leaks to prevent water wastage.");
    }
    return tips.length > 0
      ? tips
      : ["🎉 Great job! Your water usage seems efficient."];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <Text style={styles.headerTitle}>Water Footprint Calculator</Text>
        <Text style={styles.headerSubtitle}>Calculate your water usage</Text>
      </LinearGradient>

      {/* Daily Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Activities</Text>
        <InputField
          label="Shower Duration (minutes/day)"
          value={showerDuration}
          onChangeText={setShowerDuration}
          icon="shower"
        />
        <InputField
          label="Laundry Loads (per week)"
          value={laundryLoads}
          onChangeText={setLaundryLoads}
          icon="local-laundry-service"
        />
        <View style={styles.inputContainer}>
          <MaterialIcons
            name={dishwashingMethod === "machine" ? "kitchen" : "pan-tool"}
            size={20}
            color="#4CAF50"
            style={styles.inputIcon}
          />
          <Menu
            visible={visibleMenu}
            onDismiss={() => setVisibleMenu(false)}
            anchor={
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setVisibleMenu(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  Dishwashing Method: {dishwashingMethod}
                </Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={20}
                  color="#4CAF50"
                />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                setDishwashingMethod("machine");
                setVisibleMenu(false);
              }}
              title="Machine"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setDishwashingMethod("hand");
                setDishwasherLoads("0");
                setVisibleMenu(false);
              }}
              title="Hand"
            />
          </Menu>
        </View>
        {dishwashingMethod === "machine" && (
          <InputField
            label="Dishwasher Loads (per week)"
            value={dishwasherLoads}
            onChangeText={setDishwasherLoads}
            icon="kitchen"
          />
        )}
        <InputField
          label="Garden Watering (times/week)"
          value={gardenWatering}
          onChangeText={setGardenWatering}
          icon="nature-people"
        />
        <InputField
          label="Toilet Flushes (per day)"
          value={toiletFlushes}
          onChangeText={setToiletFlushes}
          icon="wc"
        />
        <InputField
          label="Faucet Usage (minutes/day)"
          value={faucetUsage}
          onChangeText={setFaucetUsage}
          icon="water"
        />
        <InputField
          label="Car Washes (per month)"
          value={carWashes}
          onChangeText={setCarWashes}
          icon="local-car-wash"
        />
        <InputField
          label="Leakage (liters/day)"
          value={leakage}
          onChangeText={setLeakage}
          icon="water-drop"
        />
        <InputField
          label="Pool Maintenance (liters/month)"
          value={poolMaintenance}
          onChangeText={setPoolMaintenance}
          icon="pool"
        />
      </View>

      {/* Calculate Button */}
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={() => {
          const { totalDailyUsage, totalMonthlyUsage } = calculateWaterUsage();
          setTotalUsage(totalDailyUsage);
        }}
      >
        <Text style={styles.calculateButtonText}>Calculate Water Usage</Text>
      </TouchableOpacity>

      {/* Results Section */}
      {totalUsage !== null && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Your Water Usage</Text>
          <Text style={styles.totalUsage}>
            {totalUsage.toFixed(2)} liters/day
          </Text>
          <Text style={styles.totalUsage}>
            {(totalUsage * 30).toFixed(2)} liters/month
          </Text>

          <Text style={styles.tipsTitle}>💡 Water-Saving Tips</Text>
          {getWaterSavingTips().map((tip, index) => (
            <Text key={index} style={styles.tipText}>
              {tip}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const InputField = ({ label, value, onChangeText, icon }) => (
  <View style={styles.inputContainer}>
    <MaterialIcons
      name={icon}
      size={20}
      color="#4CAF50"
      style={styles.inputIcon}
    />
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
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  dropdownButtonText: {
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
  totalUsage: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

export default WaterFootprintCalculator;
