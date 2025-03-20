import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { predefinedChallenges } from "../data/predefinedChallenges";

const PredefinedChallenges: React.FC<{ navigation: any }> = ({ navigation }) => {
  const challenges = predefinedChallenges;

  const renderChallengeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.challengeItem}
      onPress={() => navigation.navigate("ChallengeDetails", { challenge: item })}
    >
      <Image source={{ uri: item.coverImage }} style={styles.coverImage} />
      <View style={styles.challengeContent}>
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription}>{item.description}</Text>
        <Text style={styles.challengeXP}>Total XP: {item.totalXP}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Predefined Challenges</Text>
      <FlatList
        data={challenges}
        renderItem={renderChallengeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  challengeItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coverImage: {
    width: "100%",
    height: 150,
  },
  challengeContent: {
    padding: 16,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  challengeXP: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default PredefinedChallenges;