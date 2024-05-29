import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { styles } from "../AddproductStyles";
import { Color } from "../../GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const Addproduct = () => {

  const navigation = useNavigation();

  const [imageUris, setImageUris] = useState<string[]>([]);
  const [imageMain, setImageMain] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [productDetails, setProductDetails] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number | null>(null);

  const resetFields = (): void => {
    setImageUris([]);
    setImageMain(null);
    setProductName('');
    setProductDetails('');
    setProductPrice(null);
  };

  useEffect(() => {
    return () => {
      resetFields();
    };
  }, []);

  const handleSetProductName = (name: string) => {
    setProductName(name.trim());
  };

  const handleSetProductDetails = (details: string) => {
    setProductDetails(details.trim());
  };

  const handleSetProductPrice = (productPice : string) => {
    
    const numericText = productPice.replace(/[^0-9]/g, '');
    const numericValue = numericText ? Number(numericText) : null;
    setProductPrice(numericValue);
  };


  const handleMainImagePick = (): void => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1080,
      maxWidth: 1080,
      selectionLimit: 1,
    };
  
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setImageMain(uri);
        }
      }
    });
  };
  
  const handleImagePick = (): void => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1080,
      maxWidth: 1080,
      selectionLimit: 10,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        // Filter out undefined assets
        const validUris = response.assets
          .map(asset => asset.uri)
          .filter((uri): uri is string => uri !== undefined);
        setImageUris(validUris);
      }
    });
  };

  const removeImage = (index: number): void => {
    const updatedUris = [...imageUris];
    updatedUris.splice(index, 1);
    setImageUris(updatedUris);
  };

  const removeMainImage = (): void => {
    setImageMain(null);
  };

  const uploadImage = async (imageUris: string[], imageMain: string | null, token: string): Promise<{ mainImageUrl: string | null; imageUrls: string[] }> => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    };

    const uploadTask = async (uri: string): Promise<string> => {
      const formData = new FormData();
      formData.append('file', {
        name: 'upload.jpg',
        type: 'image/jpeg',
        uri,
      } as any);

      const response = await axios.post('https://stg-dashboard.theonecargo.com/api/upload', formData, config);
      return response.data.url;
    };

    const mainImageUrl = imageMain ? await uploadTask(imageMain) : null;
    const imageUrls = await Promise.all(imageUris.map(uploadTask));

    return {
      mainImageUrl,
      imageUrls,
    };
  };

  const handleSubmit = async (): Promise<void> => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Upload Failed', 'No token available');
      return;
    }
    if (productName && productDetails && productPrice) {
      if (imageMain && imageUris.length > 0) {
        try {
          const { mainImageUrl, imageUrls } = await uploadImage(imageUris, imageMain, token);

          const configProduct = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };

          const formDataProduct = {
            name: productName,
            description: productDetails,
            image: mainImageUrl,
            images: imageUrls,
            price: productPrice
          };

          await axios.post('https://stg-dashboard.theonecargo.com/api/product/missing', formDataProduct, configProduct);

          resetFields();

          console.log('System Message', 'The transaction has been completed successfully.');
          Alert.alert('System Message', 'The transaction has been completed successfully.');
        } catch (error: any) {
          console.error('Error uploading images:', error);
          Alert.alert('System Message', `message : ${error.message}`);
        }
      } else {
        Alert.alert('No Image Selected', 'Please select at least one main image and additional images.');
      }
    } else {
      Alert.alert('Incomplete information', 'Please fill in all information.');
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.section}>
          {imageMain && (
            <TouchableOpacity onPress={removeMainImage}>
              <Image source={{ uri: imageMain }} style={styles.mainImage} />
            </TouchableOpacity>
          )}

          {!imageMain && (
            <TouchableOpacity onPress={handleMainImagePick} style={styles.uploadContainer}>
              <Text style={styles.uploadText}>เลือกภาพสินค้าหลัก</Text>
              <Image
                resizeMode="cover"
                source={require("../../assets/materialsymbolsupload1.png")}
                style={styles.uploadImage}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          {imageUris.length === 0 && (
            <TouchableOpacity onPress={handleImagePick} style={styles.uploadContainer}>
              <Text style={styles.uploadText}>Upload</Text>
              <Image
                resizeMode="cover"
                source={require("../../assets/materialsymbolsupload.png")}
                style={styles.uploadImage}
              />
            </TouchableOpacity>
          )}

          {imageUris.length > 0 && (
            <ScrollView horizontal style={styles.imageScrollView}>
              {imageUris.map((uri, index) => (
                <TouchableOpacity key={index} onPress={() => removeImage(index)}>
                  <Image source={{ uri }} style={styles.uploadedImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <TextInput
            placeholder="ชื่อสินค้า"
            placeholderTextColor="gray"
            value={productName}
            onChangeText={handleSetProductName}
            style={styles.textInput}
          />

          <TextInput
            placeholder="รายละเอียดสินค้า"
            placeholderTextColor="gray"
            multiline
            value={productDetails}
            onChangeText={handleSetProductDetails}
            style={[styles.textInput, styles.multilineInput]}
          />

          <TextInput
            placeholder="ราคาสินค้า"
            placeholderTextColor="gray"
            value={productPrice !== null ? String(productPrice) : ''}
            onChangeText={handleSetProductPrice}
            style={styles.textInput}
            keyboardType="numeric" 
          />
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>ยืนยัน</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Addproduct;