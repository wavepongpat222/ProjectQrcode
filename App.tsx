import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Scan from "./src/screens/Scanner";
import ChooseStorage from "./src/screens/choosestorage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChooseStorage" component={ChooseStorage} />
        <Stack.Screen name="Scanner" component={Scan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
