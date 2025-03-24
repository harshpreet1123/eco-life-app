import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import EcoLoader from "../components/EcoLoader";
import QuestionStep from "../components/QuestionStep";
import RenderHTML from "react-native-render-html";

const DailySustainabilityTracker: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      question: "How did you commute today?",
      type: "multipleChoice",
      options: ["Walked/Biked", "Public Transport", "Personal Car"],
      key: "transportation",
    },
    {
      question: "Did you turn off lights and appliances when not in use?",
      type: "yesNo",
      key: "energyUsage",
    },
    {
      question: "How long was your shower today?",
      type: "rangeSelector",
      options: ["0-5 mins", "5-10 mins", "10+ mins"],
      key: "waterUsage",
    },
    {
      question: "Did you recycle today?",
      type: "yesNo",
      key: "wasteManagement",
    },
    {
      question: "Did you eat any meat today?",
      type: "yesNo",
      key: "foodChoices",
    },
    {
      question: "Did you use any single-use plastics today?",
      type: "yesNo",
      key: "plasticUsage",
    },
    {
      question: "Did you buy any locally sourced products today?",
      type: "yesNo",
      key: "shopping",
    },
    {
      question: "Did you participate in any carbon offset activities today?",
      type: "yesNo",
      key: "carbonOffset",
    },
    {
      question:
        "Is there anything else you did today that negatively impacted the environment?",
      type: "openEnded",
      key: "negativeImpact",
    },
    {
      question:
        "Is there anything else you did today that positively impacted the environment?",
      type: "openEnded",
      key: "positiveImpact",
    },
  ];

  const handleNextStep = (response: any) => {
    setResponses({ ...responses, [questions[currentStep].key]: response });

    // Check if there's a follow-up question
    const currentQuestion = questions[currentStep];
    if (
      currentQuestion.followUp &&
      currentQuestion.followUp.condition(response)
    ) {
      setCurrentStep(currentStep + 0.5); // Use a fractional step for follow-ups
    } else if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitResponses();
    }
  };

  const submitResponses = async () => {
    setLoading(true);
    console.log(responses);
    try {
      const prompt = `Analyze the following daily activities and calculate a sustainability score out of 100. Provide feedback on how the user can improve. Return the response in JSON format like this: { "score": number, "feedback": html-string-with-proper-styling-use-emoji-also-if-needed }, only json nothing else, in need to use this respones as a api respones which handle json only, so anything else json will fail it(json as string responese, no need to format it as json). re\n\n${JSON.stringify(
        responses
      )}`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract the response text
      const responseText = response.data.candidates[0].content.parts[0].text;
      console.log(responseText);

      // Parse the JSON response
      const jsonStartIndex = responseText.indexOf("```json") + 7; // Move index past "```json"
      const jsonEndIndex = responseText.lastIndexOf("```");
      const jsonString = responseText
        .slice(jsonStartIndex, jsonEndIndex)
        .trim(); // Remove whitespace
      const { score, feedback } = JSON.parse(jsonString);
      setScore(score);
      setFeedback(feedback);
    } catch (error) {
      console.error("Error fetching score:", error);
      alert("Failed to calculate score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <Text style={styles.headerTitle}>Daily Sustainability Tracker 🌱</Text>
      </LinearGradient>

      {score === null ? (
        <QuestionStep
          question={questions[Math.floor(currentStep)]}
          onNext={handleNextStep}
        />
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            Your Daily Sustainability Score
          </Text>
          <Text style={styles.score}>{score}/100</Text>
          <RenderHTML
            contentWidth={300} // Adjust based on your layout
            source={{ html: feedback }}
          />
        </View>
      )}

      {loading && <EcoLoader />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  resultsContainer: {
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
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  score: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  feedback: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default DailySustainabilityTracker;
