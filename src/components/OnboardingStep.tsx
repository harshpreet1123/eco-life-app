import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

interface OnboardingStepProps {
  backgroundImage?: any;
  title: string;
  description: string;
  onNext: () => void;
  isLastStep: boolean;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  backgroundImage,
  title,
  description,
  onNext,
  isLastStep,
}) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Button
            title={isLastStep ? "Get Started" : "Next"}
            onPress={onNext}
            buttonStyle={styles.button}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 40,
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    width: Dimensions.get("screen").width * 0.85,
    borderRadius: 12,
  },
});

export default OnboardingStep;