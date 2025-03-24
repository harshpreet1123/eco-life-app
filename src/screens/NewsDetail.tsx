import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const NewsDetailScreen = ({ route }) => {
  const { article } = route.params;
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{ flex: 1, backgroundColor: "#f4f4f4", opacity: fadeAnim }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header with Back Button */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 8 }}
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
            News Details
          </Text>
        </View>

        {/* News Image */}
        <Image
          source={{ uri: article.urlToImage }}
          style={{
            width: "95%",
            height: 250,
            borderRadius: 15,
            alignSelf: "center",
            marginBottom: 15,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        />

        {/* Title */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
            {article.title}
          </Text>
          <Text style={{ fontSize: 14, color: "#777", marginVertical: 5 }}>
            {article.source.name} •{" "}
            {new Date(article.publishedAt).toDateString()}
          </Text>
        </View>

        {/* Article Content */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, lineHeight: 24, color: "#444" }}>
            {article.content?.split("[+")[0] || "Content not available."}
          </Text>
        </View>

        {/* Read More Button */}
        <TouchableOpacity
          onPress={() => Linking.openURL(article.url)}
          style={{
            backgroundColor: "#007AFF",
            padding: 15,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 20,
            width: "90%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Read Full Article
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
};

export default NewsDetailScreen;
