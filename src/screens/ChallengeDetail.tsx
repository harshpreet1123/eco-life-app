import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const ChallengeDetails: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { challenge } = route.params;
  const [tasks, setTasks] = useState(challenge.tasks);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const toggleExpandTask = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <View style={styles.container}>
      <Image source={{ uri: challenge.coverImage }} style={styles.coverImage} />
      <View style={styles.content}>
        <Text style={styles.header}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {completedTasks}/{tasks.length} tasks completed
        </Text>

        {/* Task List */}
        <ScrollView style={styles.taskList}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.taskItem,
                task.completed && styles.completedTaskItem,
              ]}
              onPress={() => toggleExpandTask(task.id)}
            >
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                {task.completed && (
                  <Text style={styles.completedIcon}>✔️</Text>
                )}
              </View>
              {expandedTaskId === task.id && (
                <View style={styles.taskDetails}>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                  <Text style={styles.taskXP}>XP: {task.xp}</Text>
                  <TouchableOpacity
                    style={[
                      styles.completeButton,
                      task.completed && styles.completedButton,
                    ]}
                    onPress={() => handleCompleteTask(task.id)}
                  >
                    <Text style={styles.completeButtonText}>
                      {task.completed ? "Completed" : "Mark as Complete"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  coverImage: {
    width: "100%",
    height: 200,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completedTaskItem: {
    backgroundColor: "#e8f5e9",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  completedIcon: {
    fontSize: 16,
    color: "#4CAF50",
  },
  taskDetails: {
    marginTop: 10,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  taskXP: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  completedButton: {
    backgroundColor: "#ccc",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChallengeDetails;