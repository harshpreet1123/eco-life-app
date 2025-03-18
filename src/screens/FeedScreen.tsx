import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import PagerView from "react-native-pager-view";
import ImageView from "react-native-image-viewing"; // For full-screen image viewer

const FeedScreen: React.FC = () => {
  const [visible, setVisible] = useState(false); // State for full-screen image viewer
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // State for active pagination dot

  // Sample posts data
  const posts = [
    {
      id: 1,
      user: {
        name: "EcoWarrior123",
        profilePic:
          "https://www.lummi.ai/api/render/image/322ebca2-b9de-43f6-830f-a5907285d671?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMyMmViY2EyLWI5ZGUtNDNmNi04MzBmLWE1OTA3Mjg1ZDY3MSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiNDd5aFFKRVlzdFgwTHdPSUxyTGQ1IiwiaWF0IjoxNzQyMzIxMjI4LCJleHAiOjE3NDIzMjEyODh9.v4mkdg5ObqbOaulkfYImXvojYMrx66RCf15jUtwuwqk",
      },
      timestamp: "2h ago",
      text: "Just planted 3 trees in my neighborhood! 🌱 #EcoFriendly #GreenLiving",
      images: [
        "https://www.lummi.ai/api/render/image/2088a173-fc42-4193-9913-1e78141dffe5?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIwODhhMTczLWZjNDItNDE5My05OTEzLTFlNzgxNDFkZmZlNSIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiY1J4QVhxV1dneVNPSDM2YTJaZ1JsIiwiaWF0IjoxNzQyMzIyMjM1LCJleHAiOjE3NDIzMjIyOTV9.hDaFQv6u0U__TsiVi-dpgGlwY2Zp8MoEQsGTDCam76M",
        "https://www.lummi.ai/api/render/image/3935b2e6-e102-429a-8b89-e9dd2169c32c?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjM5MzViMmU2LWUxMDItNDI5YS04Yjg5LWU5ZGQyMTY5YzMyYyIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiUkVnOXVEZEptdl9EcDBmUWtIbzhYIiwiaWF0IjoxNzQyMzIxMzU3LCJleHAiOjE3NDIzMjE0MTd9.qMF9_ClxCXAcnCjMW7Q7ZjPxZA14-nKcsNCfQqfGsnw",
      ],
      likes: 12,
      comments: 4,
    },
    {
      id: 2,
      user: {
        name: "GreenLife",
        profilePic:
          "https://www.lummi.ai/api/render/image/e10cce8c-9e9c-48ee-a426-63d529e81663?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImUxMGNjZThjLTllOWMtNDhlZS1hNDI2LTYzZDUyOWU4MTY2MyIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiMG9jYUR5bUYyUEVzZGN6YjZNZHRTIiwiaWF0IjoxNzQyMzIyMzA0LCJleHAiOjE3NDIzMjIzNjR9.mjODK5Q9d1eHzp4oHYDJ7sbZkWFpvclHtRUnIrkyTGA",
      },
      timestamp: "5h ago",
      text: "Switched to reusable bags today. Every small step counts! 🛍️",
      images: [],
      likes: 8,
      comments: 2,
    },
    {
      id: 3,
      user: {
        name: "NatureLover",
        profilePic:
          "https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      timestamp: "1d ago",
      text: "Reduced my plastic usage by 50% this week. Feeling proud! 🌍",
      images: [
        "https://www.lummi.ai/api/render/image/d112c49f-91d4-441b-a87e-7450dd164193?token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQxMTJjNDlmLTkxZDQtNDQxYi1hODdlLTc0NTBkZDE2NDE5MyIsImRvd25sb2FkU2l6ZSI6Im1lZGl1bSIsInJlbmRlclNwZWNzIjp7ImVmZmVjdHMiOnsicmVmcmFtZSI6e319fSwic2hvdWxkQXV0b0Rvd25sb2FkIjpmYWxzZSwianRpIjoiMm9GRlY1Z3ZrTHB3NTlhWmdNZ29HIiwiaWF0IjoxNzQyMzIyMzcyLCJleHAiOjE3NDIzMjI0MzJ9.3Qv6lCLO_BsTly6J6GcuS-rgIObKFK8NIfRtYo3JYpk",
      ],
      likes: 20,
      comments: 6,
    },
    {
      id: 4,
      user: {
        name: "EcoHero",
        profilePic:
          "https://images.pexels.com/photos/2173382/pexels-photo-2173382.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      timestamp: "3d ago",
      text: "Volunteered for a beach clean-up drive. Let's keep our planet clean! 🏖️",
      images: [
        "https://images.pexels.com/photos/9037596/pexels-photo-9037596.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/9034108/pexels-photo-9034108.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      likes: 30,
      comments: 10,
    },
    {
      id: 5,
      user: {
        name: "SustainableSoul",
        profilePic:
          "https://images.pexels.com/photos/4203842/pexels-photo-4203842.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      timestamp: "4d ago",
      text: "Started composting at home. It's easier than I thought! 🍂",
      images: [],
      likes: 15,
      comments: 3,
    },
    {
      id: 6,
      user: {
        name: "GreenThumb",
        profilePic:
          "https://images.pexels.com/photos/4663107/pexels-photo-4663107.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      timestamp: "5d ago",
      text: "My little garden is thriving! Growing my own veggies feels amazing. 🥕",
      images: [
        "https://images.pexels.com/photos/16002325/pexels-photo-16002325/free-photo-of-a-woman-holding-a-basket-of-vegetables-in-the-middle-of-a-field.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/5561311/pexels-photo-5561311.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/18272292/pexels-photo-18272292/free-photo-of-a-green-gourd-hanging-from-a-vine.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      likes: 25,
      comments: 7,
    },
    {
      id: 7,
      user: {
        name: "EcoExplorer",
        profilePic:
          "https://images.pexels.com/photos/5014213/pexels-photo-5014213.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      timestamp: "6d ago",
      text: "Biked to work today instead of driving. Saving the planet, one ride at a time! 🚴‍♂️",
      images: [
        "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      likes: 18,
      comments: 5,
    },
  ];

  // Render carousel item
  const renderCarouselItem = (item: string, index: number) => {
    if (!item) return null; // Handle undefined or invalid items
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => {
          setCurrentImageIndex(index); // Set the current image index
          setVisible(true); // Open the full-screen viewer
        }}
      >
        <Image source={{ uri: item }} style={styles.carouselImage} />
      </TouchableOpacity>
    );
  };

  // Render post item
  const renderPostItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.postContainer}>
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Image
            source={{ uri: item.user.profilePic }}
            style={styles.profilePic}
          />
          <View style={styles.userInfoText}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>

        {/* Post Text */}
        {item.text && <Text style={styles.postText}>{item.text}</Text>}

        {/* Post Images */}
        {item.images && item.images.length > 0 && (
          <View>
            <PagerView
              style={styles.carouselContainer}
              onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
            >
              {item.images.map((image: string, index: number) =>
                renderCarouselItem(image, index)
              )}
            </PagerView>

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
              {item.images.length > 1 &&
                item.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === activeIndex && styles.activeDot,
                    ]}
                  />
                ))}
            </View>
          </View>
        )}

        {/* Interactions */}
        <View style={styles.interactionsContainer}>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="heart-outline" size={24} color="#666" />
            <Text style={styles.interactionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#666" />
            <Text style={styles.interactionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="share-social-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <ImageView
          images={posts
            .filter((post) => post.images && post.images.length > 0)
            .flatMap((post) =>
              post.images.map((image: string) => ({ uri: image }))
            )}
          imageIndex={currentImageIndex}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Feed List */}
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.feedContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  feedContainer: {
    padding: 16,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  postText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  carouselContainer: {
    height: 300,
    marginBottom: 10,
  },
  carouselImage: {
    width: "98%",
    height: "100%",
    borderRadius: 12,
    alignSelf: "center",
  },
  interactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#333",
  },
});

export default FeedScreen;
