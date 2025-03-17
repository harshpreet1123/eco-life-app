import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";
const App: React.FC = () => {
  return (
    // <Provider>
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
    // </Provider>
  );
};

export default App;
