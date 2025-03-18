import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Calendar, DateData } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

const ChallengesScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"daily" | "weekly">("daily");
  const bottomSheetRef = useRef<RBSheet>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Sample data
  const dailyChallenges = [
    {
      id: 1,
      title: "Use a reusable water bottle",
      requiresProof: false,
      points: 10,
      timeLeft: "5h 30m",
      completed: false,
      completedDate: null,
    },
  ];

  const weeklyChallenges = [
    {
      id: 2,
      title: "Plant 3 trees",
      requiresProof: true,
      points: 50,
      timeLeft: "3d 12h",
      completed: false,
      completedDate: null,
    },
    {
      id: 3,
      title: "Reduce plastic usage by 50%",
      requiresProof: false,
      points: 30,
      timeLeft: "6d 8h",
      completed: true,
      completedDate: "2023-10-15",
    },
  ];

  // Sample completed challenges data
  const completedChallenges = {
    "2025-02-15": [
      {
        id: 3,
        title: "Reduce plastic usage by 50%",
        points: 30,
      },
    ],
    "2025-02-20": [
      {
        id: 4,
        title: "Walk to work",
        points: 20,
      },
    ],
  };

  const handleChallengePress = (challenge: any) => {
    setSelectedChallenge(challenge);
    bottomSheetRef.current?.open();
  };

  const handleMarkCompleted = (withPost: boolean = false) => {
    if (selectedChallenge.requiresProof) {
      // Navigate to Create Post screen
      console.log("Redirect to Create Post screen");
    } else {
      // Mark as completed directly
      console.log("Challenge marked as completed", withPost ? "with post" : "");
    }
    bottomSheetRef.current?.close();
  };

  const handleDatePress = (date: DateData) => {
    console.log(date);
    setSelectedDate(date.dateString);
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "daily" && styles.activeTab]}
          onPress={() => setSelectedTab("daily")}
        >
          <Text style={styles.tabText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "weekly" && styles.activeTab]}
          onPress={() => setSelectedTab("weekly")}
        >
          <Text style={styles.tabText}>Weekly</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {selectedTab === "daily" &&
          dailyChallenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={styles.challengeItem}
              onPress={() => handleChallengePress(challenge)}
            >
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDetails}>
                  {challenge.points} eco-points · {challenge.timeLeft} left
                </Text>
              </View>
              <View style={styles.challengeStatusContainer}>
                {challenge.requiresProof && (
                  <View style={styles.proofChip}>
                    <Ionicons name="camera" size={12} color="#fff" />
                  </View>
                )}
                <View
                  style={[
                    styles.completionChip,
                    challenge.completed && styles.completedChip,
                  ]}
                >
                  <Text style={styles.completionChipText}>
                    {challenge.completed ? "Completed" : "Not Completed"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        {selectedTab === "weekly" &&
          weeklyChallenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={styles.challengeItem}
              onPress={() => handleChallengePress(challenge)}
            >
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDetails}>
                  {challenge.points} eco-points · {challenge.timeLeft} left
                </Text>
              </View>
              <View style={styles.challengeStatusContainer}>
                {challenge.requiresProof && (
                  <View style={styles.proofChip}>
                    <Ionicons name="camera" size={12} color="#fff" />
                  </View>
                )}
                <View
                  style={[
                    styles.completionChip,
                    challenge.completed && styles.completedChip,
                  ]}
                >
                  <Text style={styles.completionChipText}>
                    {challenge.completed ? "Completed" : "Not Completed"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Calendar</Text>
          <Calendar
            markedDates={{
              "2025-02-15": { marked: true, dotColor: "#4CAF50" },
              "2025-02-20": { marked: true, dotColor: "#4CAF50" },
            }}
            onDayPress={handleDatePress}
            theme={{
              calendarBackground: "#fff",
              todayTextColor: "#4CAF50",
              selectedDayBackgroundColor: "#4CAF50",
              arrowColor: "#4CAF50",
            }}
          />
        </View>

        {/* Completed Challenges List */}
        {selectedDate && completedChallenges[selectedDate] && (
          <View style={styles.completedChallengesContainer}>
            <Text style={styles.completedChallengesTitle}>
              Challenges Completed on {selectedDate}
            </Text>
            {completedChallenges[selectedDate].map((challenge) => (
              <View key={challenge.id} style={styles.completedChallengeItem}>
                <Text style={styles.completedChallengeTitle}>
                  {challenge.title}
                </Text>
                <Text style={styles.completedChallengePoints}>
                  {challenge.points} eco-points
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown
        closeOnPressMask
        height={300}
        customStyles={{
          container: styles.bottomSheetContainer,
          draggableIcon: styles.bottomSheetDraggableIcon,
        }}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>
            {selectedChallenge?.title}
          </Text>
          <Text style={styles.bottomSheetText}>
            {selectedChallenge?.requiresProof
              ? "This challenge requires proof. You need to create a post to complete it."
              : "This challenge can be completed without proof."}
          </Text>
          {selectedChallenge?.requiresProof ? (
            <TouchableOpacity
              style={styles.bottomSheetButton}
              onPress={() => handleMarkCompleted(true)}
            >
              <Text style={styles.bottomSheetButtonText}>Create Post</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.bottomSheetButton}
                onPress={() => handleMarkCompleted()}
              >
                <Text style={styles.bottomSheetButtonText}>
                  Mark as Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomSheetButton}
                onPress={() => handleMarkCompleted(true)}
              >
                <Text style={styles.bottomSheetButtonText}>
                  Mark as Completed with Post
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  contentContainer: {
    padding: 16,
  },
  challengeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  challengeDetails: {
    fontSize: 14,
    color: "#666",
  },
  challengeStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  proofChip: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 4,
    marginRight: 8,
  },
  completionChip: {
    backgroundColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  completedChip: {
    backgroundColor: "#4CAF50",
  },
  completionChipText: {
    fontSize: 12,
    color: "#fff",
  },
  calendarContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  completedChallengesContainer: {
    marginTop: 20,
  },
  completedChallengesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  completedChallengeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  completedChallengeTitle: {
    fontSize: 14,
    color: "#333",
  },
  completedChallengePoints: {
    fontSize: 14,
    color: "#4CAF50",
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  bottomSheetDraggableIcon: {
    backgroundColor: "#ccc",
  },
  bottomSheetContent: {
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  bottomSheetText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  bottomSheetButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  bottomSheetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ChallengesScreen;
