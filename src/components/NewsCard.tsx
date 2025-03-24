import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=eco-friendly&apiKey=${API_KEY}`;

const EcoNewsSlider = () => {
  const [news, setNews] = useState([]);
  const navigation = useNavigation();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const cachedNews = await AsyncStorage.getItem(`ecoNews-${today}`);
        if (cachedNews) {
          setNews(JSON.parse(cachedNews));
        } else {
          const response = await fetch(NEWS_API_URL);
          const data = await response.json();
          console.log(data);
          const articles = data.articles;
          setNews(articles);
          await AsyncStorage.setItem(
            `ecoNews-${today}`,
            JSON.stringify(articles)
          );
        }
      } catch (error) {
        console.error("Error fetching eco-news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <FlatList
      data={news}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("NewsDetail", { article: item })}
          style={{
            width: 300,
            margin: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
        >
          <Image
            source={{ uri: item.urlToImage }}
            style={{ width: "100%", height: 150 }}
          />
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              {item.source.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default EcoNewsSlider;
