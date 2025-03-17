import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("User logged out");
  };

  return (
    <View style={styles.container}>
      {/* Header with Settings Icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Ionicons name="settings" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://www.lummi.ai/api/render/image/15f2ca40-5928-4e6d-ae6a-e9e86e8b8ca1?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE1ZjJjYTQwLTU5MjgtNGU2ZC1hZTZhLWU5ZTg2ZThiOGNhMSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiWVRIOW9ZbzdUaURORUVQT1djdUNqIiwiaWF0IjoxNzQyMjM1ODQzLCJleHAiOjE3NDIyMzU5MDN9.f51lqmXFNAdYAiQibO473_Ky6X3MrSnIcWNuUdvVZIY",
            }} // Replace with actual user image
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileBio}>
            Eco-Warrior 🌱 | Sustainability Enthusiast
          </Text>
          <Text style={styles.profileLocation}>📍 New York, USA</Text>
        </View>

        {/* Eco-Friendly Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Sustainability Score</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Acts of Kindness</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="person" size={20} color="#4CAF50" />
            <Text style={styles.optionText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="trophy" size={20} color="#4CAF50" />
            <Text style={styles.optionText}>View Achievements</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="share-social" size={20} color="#4CAF50" />
            <Text style={styles.optionText}>Share App</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="people" size={20} color="#4CAF50" />
            <Text style={styles.optionText}>Invite Friends</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  profileBio: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  profileLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // width: "100%",
    // backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 15,
    flexWrap: "wrap",
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
    borderRadius: 12,
    padding: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff4444",
  },
});

export default ProfileScreen;
