import React from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Color, FontSize, FontFamily } from "../../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChooseStorage = () => {
  const navigation = useNavigation();

  const handleThaiStoragePress = () => {
    navigation.navigate('Scanner');
  };

  const handleChinaStoragePress = () => {
    navigation.navigate('Scanner');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>เลือกคลังสินค้า</Text>
      </View>
      <TouchableHighlight
        style={styles.logoutButton}
        underlayColor="transparent"
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
      </TouchableHighlight>
      <View style={styles.frameParent}>
        <TouchableHighlight
          style={[styles.buttonWrapper, styles.buttonThaiWrapper]}
          underlayColor={Color.colorLightGray}
          onPress={handleThaiStoragePress}
        >
          <View>
            <Text style={styles.buttonText}>คลังสินค้าไทย</Text>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../../assets/emojionev1flagforthailand.png")}
            />
          </View>
        </TouchableHighlight>
        
        <TouchableHighlight
          style={[styles.buttonWrapper, styles.buttonChinaWrapper]}
          underlayColor={Color.colorLightGray}
          onPress={handleChinaStoragePress}
        >
          <View>
            <Text style={styles.buttonText}>คลังสินค้าจีน</Text>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../../assets/emojionev1flagforchina.png")}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorPaleturquoise,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  logoutButton: {
    position: "absolute",
    top: 20, // ระยะห่างจากด้านบนของหน้าจอ
    right: 20, // ระยะห่างจากด้านขวาของหน้าจอ
    padding: 10,
    backgroundColor: Color.colorWhite,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  frameParent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "50%",
    padding: 10,
    borderRadius: 15,
    backgroundColor: Color.colorWhite,
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "45%",
  },
  buttonText: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    marginTop: 10,
  },
  icon: {
    width: 64,
    height: 64,
    marginTop: 10,
  },
  buttonThaiWrapper: {
    backgroundColor: "#72ECFD",
  },
  buttonChinaWrapper: {
    backgroundColor: "#72ECFD",
  },
});

export default ChooseStorage;
