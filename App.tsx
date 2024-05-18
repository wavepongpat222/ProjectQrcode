import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Scan from "./src/screens/Scanner";
import ChooseStorage from "./src/screens/choosestorage";
import Addproduct from "./src/screens/addproduct";
import Menu from "./src/screens/menu";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="ChooseStorage" component={ChooseStorage} />
        <Stack.Screen name="Scanner" component={Scan} />
        <Stack.Screen name="Addproduct" component={Addproduct} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
