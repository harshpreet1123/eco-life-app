import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import Home from "../screens/Home";
import CarbonFootprintCalculator from "../screens/CarbonFootprintCalculator";
import WaterFootprintCalculator from "../screens/WaterTracker";
import WasteReductionTracker from "../screens/WasteTracker";
import SustainabilityTips from "../screens/SustainabilityTips";
import EcoTravelPlanner from "../screens/EcoTravelPlanner";
import SustainableDietPlanner from "../screens/DietPlanner";
import DailySustainabilityTracker from "../screens/DailySustainbilityScoreTracker";
import RandomActOfKindness from "../screens/RandomActOfKindness";
import BottomTabsNavigator from "./BottomTabsNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import ChallengesScreen from "../screens/Challenges";
import ForgotPassword from "../screens/ForgotPassword";
import Signup from "../screens/Signup";
import PredefinedChallenges from "../screens/predChallenges";
import ChallengeDetails from "../screens/ChallengeDetail";
import ProductDetailScreen from "../screens/ProductDetails";
import GenerateRecipeScreen from "../screens/RecipeMaker";
import SavedRecipesScreen from "../screens/Recipes";
import RecipeDetailScreen from "../screens/RecipeDetail";
import NewsDetailScreen from "../screens/NewsDetail";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CarbonTracker"
        component={CarbonFootprintCalculator}
      />
      <Stack.Screen name="WaterTracker" component={WaterFootprintCalculator} />
      <Stack.Screen name="WasteTracker" component={WasteReductionTracker} />
      <Stack.Screen name="SustainabilityTips" component={SustainabilityTips} />
      <Stack.Screen name="EcoTravel" component={EcoTravelPlanner} />
      <Stack.Screen name="DietPlanner" component={SustainableDietPlanner} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="DailySustainabilityTracker"
        component={DailySustainabilityTracker}
      />
      <Stack.Screen
        name="RandomActOfKindness"
        component={RandomActOfKindness}
      />
      <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
      <Stack.Screen name="Challenges" component={ChallengesScreen} />
      <Stack.Screen name="PreChallenges" component={PredefinedChallenges} />
      <Stack.Screen name="ChallengeDetails" component={ChallengeDetails} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="RecipeMaker" component={GenerateRecipeScreen} />
      <Stack.Screen name="RecipeScreen" component={SavedRecipesScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
