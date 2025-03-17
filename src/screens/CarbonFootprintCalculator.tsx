import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Divider, Provider } from "react-native-paper";

const CarbonFootprintCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // State for user inputs
  const [householdSize, setHouseholdSize] = useState("");
  const [electricityUsage, setElectricityUsage] = useState("");
  const [electricityUnit, setElectricityUnit] = useState("kWh");
  const [gasUsage, setGasUsage] = useState("");
  const [gasUnit, setGasUnit] = useState("cubic meters");
  const [waterUsage, setWaterUsage] = useState("");
  const [waterUnit, setWaterUnit] = useState("liters");
  const [trees, setTrees] = useState("");
  const [plasticUsage, setPlasticUsage] = useState("");
  const [plasticUnit, setPlasticUnit] = useState("kg");
  const [firewoodUsage, setFirewoodUsage] = useState("");
  const [firewoodUnit, setFirewoodUnit] = useState("kg");
  const [meatConsumption, setMeatConsumption] = useState("");
  const [meatUnit, setMeatUnit] = useState("kg");
  const [dairyConsumption, setDairyConsumption] = useState("");
  const [dairyUnit, setDairyUnit] = useState("kg");
  const [vegetableConsumption, setVegetableConsumption] = useState("");
  const [vegetableUnit, setVegetableUnit] = useState("kg");
  const [publicTransport, setPublicTransport] = useState("");
  const [publicTransportUnit, setPublicTransportUnit] = useState("km");
  const [carMileage, setCarMileage] = useState("");
  const [carUnit, setCarUnit] = useState("km");
  const [twoWheelerMileage, setTwoWheelerMileage] = useState("");
  const [twoWheelerUnit, setTwoWheelerUnit] = useState("km");
  const [flightHours, setFlightHours] = useState("");
  const [clothingSpending, setClothingSpending] = useState("");
  const [wasteGenerated, setWasteGenerated] = useState("");
  const [wasteUnit, setWasteUnit] = useState("kg");
  const [renewableEnergy, setRenewableEnergy] = useState("");
  const [renewableUnit, setRenewableUnit] = useState("kWh");

  // State for calculated results
  const [totalFootprint, setTotalFootprint] = useState(0);
  const [breakdown, setBreakdown] = useState({
    household: 0,
    food: 0,
    travel: 0,
    clothing: 0,
    waste: 0,
    renewable: 0,
  });

  // State for dropdown visibility
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);

  // Steps for the form
  const steps = [
    {
      title: "Household",
      questions: [
        {
          label: "Number of people in household",
          value: householdSize,
          onChangeText: setHouseholdSize,
          icon: "people",
        },
        {
          label: "Electricity Usage",
          value: electricityUsage,
          onChangeText: setElectricityUsage,
          icon: "flash-on",
          unit: electricityUnit,
          setUnit: setElectricityUnit,
          unitOptions: ["kWh", "MWh"],
        },
        {
          label: "Gas Usage",
          value: gasUsage,
          onChangeText: setGasUsage,
          icon: "local-gas-station",
          unit: gasUnit,
          setUnit: setGasUnit,
          unitOptions: ["cubic meters", "liters"],
        },
        {
          label: "Water Usage",
          value: waterUsage,
          onChangeText: setWaterUsage,
          icon: "opacity",
          unit: waterUnit,
          setUnit: setWaterUnit,
          unitOptions: ["liters", "gallons"],
        },
        {
          label: "Number of trees in your property",
          value: trees,
          onChangeText: setTrees,
          icon: "nature",
        },
        {
          label: "Plastic Usage",
          value: plasticUsage,
          onChangeText: setPlasticUsage,
          icon: "layers",
          unit: plasticUnit,
          setUnit: setPlasticUnit,
          unitOptions: ["kg", "pounds"],
        },
        {
          label: "Firewood Usage",
          value: firewoodUsage,
          onChangeText: setFirewoodUsage,
          icon: "fireplace",
          unit: firewoodUnit,
          setUnit: setFirewoodUnit,
          unitOptions: ["kg", "pounds"],
        },
        {
          label: "Renewable Energy Usage",
          value: renewableEnergy,
          onChangeText: setRenewableEnergy,
          icon: "solar-power",
          unit: renewableUnit,
          setUnit: setRenewableUnit,
          unitOptions: ["kWh", "MWh"],
        },
      ],
    },
    {
      title: "Food",
      questions: [
        {
          label: "Meat Consumption",
          value: meatConsumption,
          onChangeText: setMeatConsumption,
          icon: "fastfood",
          unit: meatUnit,
          setUnit: setMeatUnit,
          unitOptions: ["kg", "pounds"],
        },
        {
          label: "Dairy Consumption",
          value: dairyConsumption,
          onChangeText: setDairyConsumption,
          icon: "local-drink",
          unit: dairyUnit,
          setUnit: setDairyUnit,
          unitOptions: ["kg", "pounds"],
        },
        {
          label: "Vegetable Consumption",
          value: vegetableConsumption,
          onChangeText: setVegetableConsumption,
          icon: "eco",
          unit: vegetableUnit,
          setUnit: setVegetableUnit,
          unitOptions: ["kg", "pounds"],
        },
      ],
    },
    {
      title: "Travel",
      questions: [
        {
          label: "Public Transport",
          value: publicTransport,
          onChangeText: setPublicTransport,
          icon: "directions-transit",
          unit: publicTransportUnit,
          setUnit: setPublicTransportUnit,
          unitOptions: ["km", "miles"],
        },
        {
          label: "Car Mileage",
          value: carMileage,
          onChangeText: setCarMileage,
          icon: "directions-car",
          unit: carUnit,
          setUnit: setCarUnit,
          unitOptions: ["km", "miles"],
        },
        {
          label: "Two-Wheeler Mileage",
          value: twoWheelerMileage,
          onChangeText: setTwoWheelerMileage,
          icon: "motorcycle",
          unit: twoWheelerUnit,
          setUnit: setTwoWheelerUnit,
          unitOptions: ["km", "miles"],
        },
        {
          label: "Flight Hours",
          value: flightHours,
          onChangeText: setFlightHours,
          icon: "flight",
        },
      ],
    },
    {
      title: "Waste",
      questions: [
        {
          label: "Waste Generated",
          value: wasteGenerated,
          onChangeText: setWasteGenerated,
          icon: "delete",
          unit: wasteUnit,
          setUnit: setWasteUnit,
          unitOptions: ["kg", "pounds"],
        },
      ],
    },
    {
      title: "Clothing",
      questions: [
        {
          label: "Clothing Spending ($/month)",
          value: clothingSpending,
          onChangeText: setClothingSpending,
          icon: "checkroom",
        },
      ],
    },
  ];

  // Carbon footprint calculation logic
  const calculateFootprint = () => {
    // Conversion factors (example values)
    const electricityFactor = 0.0005; // kg CO2 per kWh
    const gasFactor = 0.005; // kg CO2 per cubic meter
    const waterFactor = 0.0001; // kg CO2 per liter
    const plasticFactor = 3; // kg CO2 per kg of plastic
    const firewoodFactor = 1.5; // kg CO2 per kg of firewood
    const meatFactor = 10; // kg CO2 per kg of meat
    const dairyFactor = 5; // kg CO2 per kg of dairy
    const vegetableFactor = 2; // kg CO2 per kg of vegetables
    const publicTransportFactor = 0.1; // kg CO2 per km
    const carFactor = 0.2; // kg CO2 per km
    const twoWheelerFactor = 0.15; // kg CO2 per km
    const flightFactor = 0.25; // kg CO2 per hour
    const clothingFactor = 0.01; // kg CO2 per dollar spent
    const wasteFactor = 0.5; // kg CO2 per kg of waste
    const renewableFactor = -0.0005; // kg CO2 reduction per kWh of renewable energy
    const treeFactor = -5; // kg CO2 absorbed per tree per year

    // Calculate individual footprints
    const householdFootprint =
      parseFloat(electricityUsage || "0") * electricityFactor +
      parseFloat(gasUsage || "0") * gasFactor +
      parseFloat(waterUsage || "0") * waterFactor +
      parseFloat(plasticUsage || "0") * plasticFactor +
      parseFloat(firewoodUsage || "0") * firewoodFactor +
      parseFloat(trees || "0") * treeFactor +
      parseFloat(renewableEnergy || "0") * renewableFactor;

    const foodFootprint =
      parseFloat(meatConsumption || "0") * meatFactor +
      parseFloat(dairyConsumption || "0") * dairyFactor +
      parseFloat(vegetableConsumption || "0") * vegetableFactor;

    const travelFootprint =
      parseFloat(publicTransport || "0") * publicTransportFactor +
      parseFloat(carMileage || "0") * carFactor +
      parseFloat(twoWheelerMileage || "0") * twoWheelerFactor +
      parseFloat(flightHours || "0") * flightFactor;

    const clothingFootprint =
      parseFloat(clothingSpending || "0") * clothingFactor;

    const wasteFootprint = parseFloat(wasteGenerated || "0") * wasteFactor;

    // Total footprint
    const total =
      householdFootprint +
      foodFootprint +
      travelFootprint +
      clothingFootprint +
      wasteFootprint;

    // Update state
    setTotalFootprint(total);
    setBreakdown({
      household: householdFootprint,
      food: foodFootprint,
      travel: travelFootprint,
      clothing: clothingFootprint,
      waste: wasteFootprint,
      renewable: parseFloat(renewableEnergy || "0") * renewableFactor,
    });
  };

  // Render current step
  const renderStep = () => {
    const step = steps[currentStep];
    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        {step.questions.map((question, index) => (
          <InputField
            key={index}
            label={question.label}
            value={question.value}
            onChangeText={question.onChangeText}
            icon={question.icon}
            unit={question.unit}
            setUnit={question.setUnit}
            unitOptions={question.unitOptions}
            visibleMenu={visibleMenu}
            setVisibleMenu={setVisibleMenu}
          />
        ))}
      </View>
    );
  };

  return (
    <Provider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
            <Text style={styles.headerTitle}>Carbon Footprint Calculator</Text>
            <Text style={styles.headerSubtitle}>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </Text>
          </LinearGradient>

          {/* Current Step */}
          {renderStep()}

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentStep(currentStep - 1)}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            )}
            {currentStep < steps.length - 1 ? (
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentStep(currentStep + 1)}
              >
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.calculateButton}
                onPress={calculateFootprint}
              >
                <Text style={styles.calculateButtonText}>Calculate Footprint</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Results */}
          {totalFootprint > 0 && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Your Carbon Footprint</Text>
              <Text style={styles.totalFootprint}>
                {totalFootprint.toFixed(2)} kg CO2/year
              </Text>

              <View style={styles.breakdownContainer}>
                <Text style={styles.breakdownTitle}>Breakdown</Text>
                <BreakdownItem label="Household" value={breakdown.household} />
                <BreakdownItem label="Food" value={breakdown.food} />
                <BreakdownItem label="Travel" value={breakdown.travel} />
                <BreakdownItem label="Clothing" value={breakdown.clothing} />
                <BreakdownItem label="Waste" value={breakdown.waste} />
                <BreakdownItem label="Renewable" value={breakdown.renewable} />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Provider>
  );
};

// Reusable Input Field Component
const InputField = ({
  label,
  value,
  onChangeText,
  icon,
  unit,
  setUnit,
  unitOptions,
  visibleMenu,
  setVisibleMenu,
}) => {
  const isUnitDropdown = unitOptions && unitOptions.length > 0;

  return (
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
      {isUnitDropdown && (
        <Menu
          visible={visibleMenu === label}
          onDismiss={() => setVisibleMenu(null)}
          anchor={
            <TouchableOpacity
              style={styles.unitButton}
              onPress={() => setVisibleMenu(label)}
            >
              <Text style={styles.unitButtonText}>{unit}</Text>
              <MaterialIcons name="arrow-drop-down" size={20} color="#4CAF50" />
            </TouchableOpacity>
          }
        >
          {unitOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Menu.Item
                onPress={() => {
                  setUnit(option);
                  setVisibleMenu(null);
                }}
                title={option}
              />
              {index < unitOptions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Menu>
      )}
    </View>
  );
};

// Reusable Breakdown Item Component
const BreakdownItem = ({ label, value }) => (
  <View style={styles.breakdownItem}>
    <Text style={styles.breakdownLabel}>{label}</Text>
    <Text style={styles.breakdownValue}>{value.toFixed(2)} kg CO2</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingBottom: 40,
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
  stepContainer: {
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
  stepTitle: {
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
  unitButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  unitButtonText: {
    fontSize: 14,
    color: "#333",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  navButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
  totalFootprint: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  breakdownContainer: {
    marginTop: 10,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  breakdownLabel: {
    fontSize: 16,
    color: "#666",
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default CarbonFootprintCalculator;