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

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic
    console.log("Logging in with:", email, password);
    // Navigate to the next screen after login
    navigation.navigate("MainTabs");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/login-bg.jpeg")} // Add a background image
      style={styles.background}
    >
      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

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

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          {/* Login Button */}
          <Button
            title="Login"
            onPress={handleLogin}
            buttonStyle={styles.button}
          />

          {/* Signup Link */}
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text style={styles.signupLink}>Sign up</Text>
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

export default Login;
