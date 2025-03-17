import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const QuestionStep: React.FC<{ question: any; onNext: (response: any) => void }> = ({
  question,
  onNext,
}) => {
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = () => {
    if (response !== null) {
      onNext(response);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.type === "multipleChoice" && (
        <View>
          {question.options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                response === option && styles.selectedOptionButton,
              ]}
              onPress={() => setResponse(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  response === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {question.type === "yesNo" && (
        <View style={styles.yesNoContainer}>
          <TouchableOpacity
            style={[
              styles.yesNoButton,
              response === "Yes" && styles.selectedYesNoButton,
            ]}
            onPress={() => setResponse("Yes")}
          >
            <Text
              style={[
                styles.yesNoText,
                response === "Yes" && styles.selectedYesNoText,
              ]}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.yesNoButton,
              response === "No" && styles.selectedYesNoButton,
            ]}
            onPress={() => setResponse("No")}
          >
            <Text
              style={[
                styles.yesNoText,
                response === "No" && styles.selectedYesNoText,
              ]}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {question.type === "rangeSelector" && (
        <View>
          {question.options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                response === option && styles.selectedOptionButton,
              ]}
              onPress={() => setResponse(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  response === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {question.type === "input" && (
        <TextInput
          style={styles.input}
          placeholder="Type your response here..."
          value={response}
          onChangeText={setResponse}
        />
      )}
      {question.type === "openEnded" && (
        <TextInput
          style={styles.input}
          placeholder="Type your response here..."
          value={response}
          onChangeText={setResponse}
          multiline
        />
      )}
      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  selectedOptionButton: {
    backgroundColor: "#4CAF50",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
  },
  yesNoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  yesNoButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    width: "48%",
  },
  selectedYesNoButton: {
    backgroundColor: "#4CAF50",
  },
  yesNoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  selectedYesNoText: {
    color: "#fff",
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default QuestionStep;