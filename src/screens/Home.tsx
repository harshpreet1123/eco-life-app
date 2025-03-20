import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  FontAwesome,
  Feather,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";
import StaggeredList from "@mindinventory/react-native-stagger-view";

const Home: React.FC = ({ navigation }) => {
  // Dummy data for the staggered grid items
  const gridItems = [
    {
      id: 1,
      title: "Water Tracker",
      icon: <MaterialIcons name="water" size={32} color="#fff" />,
      height: 200,
      colors: ["#2E86AB", "#A0D9D9"], // Deep Ocean Blue to Light Aqua
      route: "WaterTracker",
    },
    {
      id: 2,
      title: "Random Act of Kindness",
      icon: <FontAwesome name="heart" size={32} color="#fff" />,
      height: 160,
      colors: ["#6A994E", "#A7C957"], // Forest Green to Soft Green
      route: "RandomActOfKindness",
    },
    {
      id: 3,
      title: "Waste Tracker",
      icon: <Feather name="shopping-bag" size={32} color="#fff" />,
      height: 160,
      colors: ["#264653", "#2A9D8F"], // Dark Teal to Muted Emerald
      route: "WasteTracker",
    },
    {
      id: 4,
      title: "Carbon Tracker",
      icon: <MaterialIcons name="eco" size={32} color="#fff" />,
      height: 200,
      colors: ["#4F772D", "#90A955"], // Earthy Green to Olive
      route: "CarbonTracker",
    },
    {
      id: 5,
      title: "Eco Travel",
      icon: <MaterialIcons name="event" size={32} color="#fff" />,
      height: 200,
      colors: ["#0B6E4F", "#7DCFB6"], // Deep Green to Soft Teal
      route: "EcoTravel",
    },
    {
      id: 6,
      title: "Sustainability Tips",
      icon: <MaterialIcons name="lightbulb" size={32} color="#fff" />,
      height: 160,
      colors: ["#558564", "#A3B18A"], // Moss Green to Muted Sage
      route: "SustainabilityTips",
    },
    {
      id: 7,
      title: "Diet Planner",
      icon: <MaterialIcons name="food-bank" size={32} color="#fff" />,
      height: 160,
      colors: ["#9C6644", "#E9C46A"], // Earthy Brown to Warm Sand
      route: "DietPlanner",
    },
    {
      id: 8,
      title: "Daily Sustainability Tracker",
      icon: <MaterialIcons name="score" size={32} color="#fff" />,
      height: 200,
      colors: ["#386641", "#6A994E"], // Dark Leaf Green to Fresh Green
      route: "DailySustainabilityTracker",
    },
    {
      id: 9,
      title: "Challenges",
      icon: <SimpleLineIcons name="trophy" size={32} color="#fff" />,
      height: 200,
      colors: ["#386641", "#6A994E"], // Dark Leaf Green to Fresh Green
      route: "PreChallenges",
    },
  ];

  // Featured Articles
  const featuredArticles = [
    {
      id: 1,
      title: "10 Ways to Reduce Plastic Waste",
      image: require("../../assets/images/onboarding1.jpeg"),
    },
    {
      id: 2,
      title: "The Benefits of Composting",
      image: require("../../assets/images/onboarding2.jpeg"),
    },
  ];

  // Eco-Friendly Products
  const ecoProducts = [
    {
      id: 1,
      name: "Reusable Water Bottle",
      price: "$20",
      image: require("../../assets/images/onboarding3.jpeg"),
    },
    {
      id: 2,
      name: "Bamboo Toothbrush",
      price: "$5",
      image: require("../../assets/images/onboarding1.jpeg"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Status Bar */}
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />

      {/* Header with Greetings and Profile Picture */}
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good Morning, User!</Text>
            <Text style={styles.subGreeting}>
              Let's make today eco-friendly.
            </Text>
          </View>
          <Image
            source={require("../../assets/images/profile-pic.jpeg")}
            style={styles.profilePic}
          />
        </View>
      </LinearGradient>

      {/* Daily Progress Tracker */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Daily Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "60%" }]} />
        </View>
        <Text style={styles.progressText}>60% completed</Text>
      </View>

      {/* Tip of the Day */}
      <LinearGradient
        colors={["#81C784", "#4CAF50"]}
        style={styles.tipContainer}
      >
        <Text style={styles.tipTitle}>Tip of the Day</Text>
        <Text style={styles.tipText}>
          Use reusable bags when shopping to reduce plastic waste.
        </Text>
      </LinearGradient>

      {/* Staggered Grid */}
      <StaggeredList
        data={gridItems}
        animationType="NONE"
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={item.id}
            style={[styles.gridItem, { height: item.height }]}
            onPress={() => {
              item.route ? navigation.navigate(item.route) : null;
            }}
          >
            <LinearGradient colors={item.colors} style={styles.gridGradient}>
              <View style={styles.gridIcon}>{item.icon}</View>
              <Text style={styles.gridText}>{item.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />

      {/* Featured Articles */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Articles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => {
                navigation.navigate("CarbonTracker");
              }}
            >
              <Image source={article.image} style={styles.articleImage} />
              <Text style={styles.articleTitle}>{article.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Eco-Friendly Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Eco-Friendly Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ecoProducts.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activities */}
      <View style={styles.recentActivities}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <Feather name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.activityText}>
              Completed: Use Reusable Bottle
            </Text>
          </View>
          <View style={styles.activityItem}>
            <Feather name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.activityText}>Completed: Planted a Tree</Text>
          </View>
        </View>
      </View>

      {/* Leaderboard */}
      <View style={styles.leaderboard}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <View style={styles.leaderboardList}>
          <View style={styles.leaderboardItem}>
            <SimpleLineIcons name="trophy" size={20} color="#FFD700" />
            <Text style={styles.leaderboardText}>1. EcoWarrior123</Text>
          </View>
          <View style={styles.leaderboardItem}>
            <SimpleLineIcons name="trophy" size={20} color="#C0C0C0" />
            <Text style={styles.leaderboardText}>2. GreenHero</Text>
          </View>
          <View style={styles.leaderboardItem}>
            <SimpleLineIcons name="trophy" size={20} color="#CD7F32" />
            <Text style={styles.leaderboardText}>3. NatureLover</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subGreeting: {
    fontSize: 16,
    color: "#fff",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  progressContainer: {
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
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  tipContainer: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#fff",
  },
  gridContainer: {
    paddingHorizontal: 10,
    // alignSelf:"center",
    alignItems: "center",
    gap: 10,
  },
  gridItem: {
    // width: "1%",
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  gridGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  gridIcon: {
    marginBottom: 10,
  },
  gridText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
  },
  sectionContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  articleCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    padding: 10,
  },
  productCard: {
    width: 150,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    padding: 10,
  },
  productPrice: {
    fontSize: 14,
    color: "#4CAF50",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  recentActivities: {
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
  activityList: {
    marginTop: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  activityText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  leaderboard: {
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
  leaderboardList: {
    marginTop: 10,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  leaderboardText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
});

export default Home;
