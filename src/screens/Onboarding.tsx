import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import OnboardingStep from "../components/OnboardingStep";

const Onboarding: React.FC = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      backgroundImage: require("../../assets/images/onboarding1.jpeg"),
      title: "Welcome to EcoLife",
      description: "Start your journey towards a sustainable lifestyle.",
    },
    {
      backgroundImage: require("../../assets/images/onboarding2.jpeg"),
      title: "Track Your Impact",
      description: "Monitor your carbon footprint and eco-friendly habits.",
    },
    {
      backgroundImage: require("../../assets/images/onboarding3.jpeg"),
      title: "Join the Community",
      description:
        "Connect with like-minded individuals and make a difference.",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Navigate to Login/Signup
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <OnboardingStep
        backgroundImage={steps[step].backgroundImage}
        title={steps[step].title}
        description={steps[step].description}
        onNext={handleNext}
        isLastStep={step === steps.length - 1}
      />
      {/* Swiper Stepper */}
      <View style={styles.stepperContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepperDot,
              index === step && styles.activeStepperDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepperContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  stepperDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeStepperDot: {
    backgroundColor: "#4CAF50",
  },
});

export default Onboarding;
