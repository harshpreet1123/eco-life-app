import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";
import { View } from "react-native";
const App: React.FC = () => {
  return (
    // <Provider>
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>
    </PaperProvider>
    // </Provider>
  );
};

export default App;
