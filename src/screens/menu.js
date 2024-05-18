import * as React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color, Border, FontSize, FontFamily, Padding } from '../../GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercent, widthPercent } from '../layout';

const Menu = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
      </TouchableOpacity>
      <View style={styles.menuParent}>
        <Text style={styles.menu1}>Menu</Text>
        <View style={styles.frameChild} />
        <TouchableOpacity 
          style={[styles.addproductbutton, styles.addproductbuttonLayout]}
          onPress={() => navigation.navigate('Addproduct')}
        >
          <Image
            style={styles.file1Icon}
            resizeMode="cover"
            source={require("../../assets/file-1.png")}
          />
          <Text style={[styles.text1, styles.textTypo]}>สินค้าตกหล่น</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.choosestoragebutton, styles.addproductbuttonLayout]}
          onPress={() => navigation.navigate('ChooseStorage')}
        >
          <Image
            style={styles.gridiconsproduct}
            resizeMode="cover"
            source={require("../../assets/gridiconsproduct.png")}
          />
          <Text style={[styles.text1, styles.textTypo]}>คลังสินค้า</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addproductbuttonLayout: {
    height: heightPercent(7),
    borderWidth: 1,
    borderColor: Color.colorDeepskyblue_100,
    backgroundColor: Color.colorDeepskyblue_200,
    borderRadius: Border.br_8xs,
    width: widthPercent(80),
    borderStyle: 'solid',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  textTypo: {
    fontSize: FontSize.size_mini,
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
  },
  menu1: {
    top: heightPercent(4),
    fontSize: 20,
    width: widthPercent(50),
    height: heightPercent(6),
    textAlign: 'center',
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
    position: 'absolute',
  },
  frameChild: {
    top: heightPercent(9),
    borderColor: Color.colorBlack,
    borderTopWidth: 1,
    height: 1,
    width: widthPercent(80),
    borderStyle: 'solid',
    position: 'absolute',
  },
  addproductbutton: {
    top: heightPercent(33),
    left: widthPercent(5),
    justifyContent: 'flex-start',
    paddingVertical: Padding.p_7xs,
  },
  gridiconsproduct: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  text1: {
    marginLeft: 10,
  },
  choosestoragebutton: {
    top: heightPercent(21),
    left: widthPercent(5),
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: Padding.p_7xs,
  },
  file1Icon: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  menuParent: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    width: widthPercent(90),
    height: heightPercent(65),
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -widthPercent(45) }, { translateY: -heightPercent(32.5) }],
  },
  menu: {
    backgroundColor: '#72ecfd',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoutButton: {
    position: 'absolute',
    top: heightPercent(3),
    right: widthPercent(5),
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8xs,
    borderWidth: 1,
    borderColor: Color.colorDeepskyblue_100,
  },
  logoutButtonText: {
    fontSize: FontSize.size_mini,
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
  },
});

export default Menu;
