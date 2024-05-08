import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image as RNImage, Alert, ScrollView, Modal, Button, TextInput } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../ScanStyles';

interface CompressResult {
  uri: string;
}

const Scan: React.FC = () => {
  const [scannedData, setScannedData] = useState<string>('No QR code detected');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [urlUpload, setUrlUpload] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const handleQRCodeScan = (data: string) => {
    setScannedData(data);
    setModalVisible(true);
  };

  useEffect(() => {
    return () => {
      setImageUris([]);
    };
  }, []);

  const handleImagePick = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1080,
      maxWidth: 1080,
      selectionLimit: 4
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        setImageUris(response.assets.map(asset => asset.uri as string));
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedUris = [...imageUris];
    updatedUris.splice(index, 1);
    setImageUris(updatedUris);
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      Alert.alert("Upload Failed", "No token available");
      return;
    }
  
    if (imageUris.length > 0) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };
  
      try {
        const uploadTasks = imageUris.map(async (uri) => {
          const formData = new FormData();
          formData.append('file', {
            name: 'upload.jpg',
            type: 'image/jpeg',
            uri: uri,
          });
  
          const response = await axios.post('https://web.theonecargo.com/api/upload', formData, config);
          return response.data.url;
        });
  
        const urls = await Promise.all(uploadTasks);
        setUrlUpload(urls); 
        console.log("All uploaded URLs:", urls); 
        setImageUris([]);
        setModalVisible(false);
        Alert.alert("Upload Successful", "All images have been successfully uploaded.");
      } catch (error) {
        console.error("Error uploading images:", error);
        Alert.alert("Upload Failed", `Failed to upload images: ${error}`);
      }
    } else {
      Alert.alert("No Image Selected", "Please select at least one image.");
    }
  };
    
  const handleCloseModal = () => {
    setModalVisible(false);
    setImageUris([]);
  };

  return (
    <View style={styles.scan}>
      <Text style={styles.scanQrCode}>Scan QR Code</Text>
      <View style={styles.phcameraParent}>
        <RNImage
          style={styles.phcameraIcon}
          resizeMode="cover"
          source={require("../../assets/phcamera.png")}
        />
        <Text style={styles.pleaseMoveYour}>
          Please move your camera over another device’s screen
        </Text>
        <QRCodeScanner
          onRead={(e) => handleQRCodeScan(e.data || 'No QR code detected')}
          reactivate={true}
          reactivateTimeout={500}
          cameraType={'back'}
          showMarker={false}
          topContent={<Text style={styles.centerText}>{scannedData}</Text>}
          cameraStyle={styles.cameraSize}
          containerStyle={styles.cameraContainer}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>{scannedData}</Text> 
            <ScrollView contentContainerStyle={styles.imagePreviewContainer} horizontal>
              {imageUris.map((uri, index) => (
                <TouchableOpacity key={index} onPress={() => handleRemoveImage(index)}>
                  <RNImage
                    source={{ uri }}
                    style={styles.imagePreview}
                  />
                </TouchableOpacity>
              ))}
              {imageUris.length === 0 && (
                <TouchableOpacity style={styles.ImagePick} onPress={handleImagePick}>
                  <RNImage
                    source={require("../../assets/addpic.png")}
                  />
                </TouchableOpacity>
              )}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputnote}
                placeholder="หมายเหตุ"
                placeholderTextColor="#000"
                value={note}
                onChangeText={setNote}
              />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <RNImage
        style={styles.scanChild}
        resizeMode="cover"
        source={require("../../assets/group-1.png")}
      />
    </View>
  );
};

export default Scan;