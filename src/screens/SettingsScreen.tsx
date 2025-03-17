import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#81C784" }}
              thumbColor={notificationsEnabled ? "#4CAF50" : "#f4f3f4"}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#767577", true: "#81C784" }}
              thumbColor={darkModeEnabled ? "#4CAF50" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Eco-Friendly Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eco-Friendly Preferences</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Set Daily Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Track Carbon Footprint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Enable Eco Tips</Text>
          </TouchableOpacity>
        </View>

        {/* Account Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>App Version: 1.0.0</Text>
          <Text style={styles.aboutText}>Developed by Harsh</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
  settingButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  settingButtonText: {
    fontSize: 16,
    color: "#333",
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});

export default SettingsScreen;