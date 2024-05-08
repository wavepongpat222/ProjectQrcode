import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { heightPercent, widthPercent } from "../layout";

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        navigation.navigate("ChooseStorage");
      }
    };

    checkToken();
  }, [navigation]);

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axios.post('https://web.theonecargo.com/api/authentication/login', { username, password });
        await AsyncStorage.setItem("userToken", response.data.accessToken);
        navigation.navigate("ChooseStorage");
      } catch (error) {
        if (error.response && error.response.status === 500){
          Alert.alert("Login failed", "The username and password are incorrect.");
        }
      }
    } else {
      Alert.alert("Validation error", "Please enter valid username and password");
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} resizeMode="contain" source={require("../../assets/logo.png")} />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.registerLink}>
        <Text style={styles.registerText}>Don't have an account? Register here!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#72ECFD",
    padding: 20,
  },
  logo: {
    width: widthPercent(100),
    height: heightPercent(15),
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 20,
    fontSize: 16,
    color: "#000"
  },
  loginButton: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: "#4461f2",
    textDecorationLine: "underline",
  },
});

export default Login;
