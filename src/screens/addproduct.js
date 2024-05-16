import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../AddproductStyles";

import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Addproduct = () => {
  
  const [imageUris, setImageUris] = useState([]);
  const [imageMain, setImageMain] = useState(null); 
  const [urlUploads, setUrlUpload] = useState([]);
  const [urlUploadSingle, setUrlUploadSingle] = useState(null)

  useEffect(() => {
    return () => {
      setImageUris([]);
    };
  }, []);

  const handleMainImagePick = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1080,
      maxWidth: 1080,
      selectionLimit: 1  
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageMain(response.assets[0].uri); 
      }
    });
  };

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1080,
      maxWidth: 1080,
      selectionLimit: 10  
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        setImageUris(response.assets.map(asset => asset.uri));
      }
    });
  };  

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codeRamdom = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      codeRamdom += characters.charAt(randomIndex);
    }
    return codeRamdom;
  }

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      Alert.alert("Upload Failed", "No token available");
      return;
    }


  }

  return (
    <View style={styles.container}>
      <View style={styles.addproduct}>
        <View style={styles.submitbuttonParent}>
          <View style={styles.submitbutton}>
            <View style={styles.submitbuttonChild} />
            <Text style={[styles.text, styles.textTypo]}>ยืนยัน</Text>
          </View>
          <View style={[styles.detailproduct, styles.detailproductLayout]}>
            <View style={[styles.detailproductChild, styles.childBorder]} />
            <Text style={[styles.text1, styles.text1Typo]}>รายละเอียดสินค้า</Text>
          </View>
          <View style={[styles.productname, styles.productnameLayout]}>
            <View style={[styles.productnameChild, styles.productnameLayout]} />
            <Text style={styles.text2}>ชื่อสินค้า</Text>
          </View>
          <TouchableOpacity
            style={[styles.addpicture2, styles.addpicture2Layout]}
            onPress={handleImagePick}
          >
            <View style={[styles.addpicture2Child, styles.addpicture2Layout]} />
            <Image
              style={[
                styles.materialSymbolsuploadIcon,
                styles.materialIconLayout,
              ]}
              resizeMode="cover"
              source={require("../../assets/materialsymbolsupload.png")}
            />
            <Text style={[styles.upload, styles.text1Typo]}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addpicture, styles.addpictureLayout]}
            onPress={handleMainImagePick}
          >
            <View style={[styles.addpictureChild, styles.addpictureLayout]} />
            <Text style={styles.text3}>เลือกภาพสินค้าหลัก</Text>
            <Image
              style={[
                styles.materialSymbolsuploadIcon1,
                styles.materialIconLayout,
              ]}
              resizeMode="cover"
              source={require("../../assets/materialsymbolsupload1.png")}
            />
          </TouchableOpacity>
        </View>
            
        <Text style={[styles.text4, styles.textTypo]}>เพิ่มสินค้าใหม่</Text>
      </View>
    </View>
  );
};

export default Addproduct;
