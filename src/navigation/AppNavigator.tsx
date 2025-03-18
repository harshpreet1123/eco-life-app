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
    </Stack.Navigator>
  );
};

export default AppNavigator;
