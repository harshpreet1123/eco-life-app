import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";

const ForgotPassword: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Handle reset password logic
    console.log("Reset password for:", email);
    // Navigate back to login after reset
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/forgot-password-bg.jpeg")} // Add a background image
      style={styles.background}
    >
      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email to reset your password
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Reset Password Button */}
          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            buttonStyle={styles.button}
          />

          {/* Back to Login Link */}
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={styles.signupText}>
              Remember your password?{" "}
              <Text style={styles.signupLink}>Login</Text>
            </Text>
          </TouchableOpacity>
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
    justifyContent: "center",
    padding: 20,
  },
  container: {
    position: "absolute",
    alignItems: "center",
    bottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: Dimensions.get("screen").width * 0.85,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    width: Dimensions.get("screen").width * 0.85,
    borderRadius: 12,
    height: 50,
  },
  signupText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 14,
  },
  signupLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default ForgotPassword;
