import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image as RNImage, Alert, ScrollView, Modal, Button, TextInput } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../ScanStyles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';

interface CompressResult {
  uri: string;
}

type ScannerRouteParams = {
  Scanner: {
    type: string;
  };
};

const Scan: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ScannerRouteParams, 'Scanner'>>();
  const { type } = route.params;

  const [scannedData, setScannedData] = useState<string>('No QR code detected');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [urlUpload, setUrlUpload] = useState<string[]>([]);
  const [Fweight, setWeight] = useState<number | null>(null);
  const [Fwidth, setWidth] = useState<number | null>(null);
  const [Fheight, setHeight] = useState<number | null>(null);
  const [Flength, setLength] = useState<number | null>(null);
  const [FcontainerNumber, setContainerNumber] = useState<string | null>(null);
  const [Fqc, setQc] = useState<number | null>(null);
  const [Fbox, setBox] = useState<number | null>(null);
  const [Fnote, setNote] = useState<string | null>(null);
  
  const [qcChecked, setQcChecked] = useState(false);
  const [tilangChecked, setTilangChecked] = useState(false);

  const getOption = () => {
    let values = [];
    if (qcChecked) values.push('xx');
    if (tilangChecked) values.push('xx');
    return values.join(', ');
  };
  
  const handleQRCodeScan = (data: string) => {
    setScannedData(data);
    setModalVisible(true);

    console.log(type)
  };

  const resetFields = (): void => {
    setImageUris([]);
    setWeight(null);
    setWidth(null);
    setHeight(null);
    setLength(null);
    setContainerNumber('');
    setQc(null);
    setBox(null);
    setNote('');
    setQcChecked(false);
    setTilangChecked(false);
  };

  useEffect(() => {
    return () => {
      resetFields();
    };
  }, []);

  const handleSetContainerNumber = (FcontainerNumber: string) => {
    setContainerNumber(FcontainerNumber.trim());
  };

  const handleSetNote = (Fnote: string) => {
    setNote(Fnote.trim());
  };

  const UploadImage = async () => {

    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      Alert.alert("Upload Failed", "No token available");
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    const uploadTasks = imageUris.map(async (uri) => {
      const formData = new FormData();
      formData.append('file', {
        name: 'upload.jpg',
        type: 'image/jpeg',
        uri: uri,
      });

      const response = await axios.post('https://stg-dashboard.theonecargo.com/api/upload', formData, config);
      return response.data.url;
    });

    try {
      const urls = await Promise.all(uploadTasks);
      setUrlUpload(urls);
      console.log("All uploaded URLs:", urls);
      return urls;  
    } catch (error) {
      Alert.alert("Upload Failed", "An error occurred during upload");
      console.error("Upload error:", error);
      return [];
    }
  }
    


  const handleImagePick = () => {
    const options: ImageLibraryOptions = {
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
      try {
        const uploadedUrls = await UploadImage();
        let scanResponse;
        let configScan = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
  
        if (type === "China") { 
          let Foption = getOption();
  
          if (Fweight && Fwidth && Fheight && Flength && FcontainerNumber && Fbox && Fqc && Foption && Fnote) {
            const formDataScan = {
              code: scannedData,
              images: uploadedUrls,
              weight: Fweight,
              width: Fwidth,
              height: Fheight,
              length: Flength,
              containerNumber: FcontainerNumber,
              box: Fbox,
              qc: Fqc,
              option: Foption,
              remark: Fnote
            };
  
            scanResponse = await axios.post('https://stg-dashboard.theonecargo.com/api/order/scan/china', formDataScan, configScan);
            console.log("china scan");
          } else {
            Alert.alert("System message", "Please fill in all information");
            setModalVisible(true);
            return;
          }
        } else if (type === "Thai") {
          const formDataScan = {
            code: scannedData,
            images: uploadedUrls,
          };
  
          scanResponse = await axios.post('https://stg-dashboard.theonecargo.com/api/order/scan/thai', formDataScan, configScan);
          console.log("Thai scan");
        }
  
        if (scanResponse) {
          Alert.alert("System message", `message : ${scanResponse.data.message}`);
        }
  
        setImageUris([]);
        setModalVisible(false);
        resetFields();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const errorMessage = error.response.data && error.response.data.message ? error.response.data.message : 'Unknown error';
            Alert.alert("Error", `${errorMessage}`);
          } else if (error.request) {
            Alert.alert("Error", "No response received from server.");
          } else {
            Alert.alert("Error", `Error: ${error.message}`);
          }
        } else {
          Alert.alert("Error", `Unexpected error: ${error}`);
        }
        setModalVisible(true);
      }
    } else {
      Alert.alert("No Image Selected", "Please select at least one image.");
      setModalVisible(true);
    }
  };
      
    
  const handleCloseModal = () => {
    setModalVisible(false);
    setImageUris([]);
    resetFields();
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

          {type === "China" ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
              <View style={styles.modalViewChina}>
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

                <Text style={styles.additionalLabel}>เลือกค่าเพิ่มเติม</Text>  
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    title="QC"
                    checked={qcChecked}
                    onPress={() => setQcChecked(!qcChecked)}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkboxText}
                    checkedIcon={
                      <View style={styles.checkedIcon}>
                        <Text style={styles.iconText}>✔</Text>
                      </View>
                    }
                    uncheckedIcon={<View style={styles.uncheckedIcon} />}
                  />
                  <CheckBox
                    title="ตีลัง"
                    checked={tilangChecked}
                    onPress={() => setTilangChecked(!tilangChecked)}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkboxText}
                    checkedIcon={
                      <View style={styles.checkedIcon}>
                        <Text style={styles.iconText}>✔</Text>
                      </View>
                    }
                    uncheckedIcon={<View style={styles.uncheckedIcon} />}
                  />
                </View>

                  <View style={styles.dimensionInputContainer}>
                  <View style={styles.dimensionInputWrapper}>
                    <TextInput
                      style={styles.dimensionInput}
                      placeholder="กว้าง (เซนติเมตร)"
                      placeholderTextColor="#000"
                      value={Fwidth ? Fwidth.toString() : ''}
                      onChangeText={(text) => setWidth(parseFloat(text))}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.dimensionInputWrapper}>
                    <TextInput
                      style={styles.dimensionInput}
                      placeholder="ยาว (เซนติเมตร)"
                      placeholderTextColor="#000"
                      value={Flength ? Flength.toString() : ''}
                      onChangeText={(text) => setLength(parseFloat(text))}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.dimensionInputContainer}>
                  <View style={styles.dimensionInputWrapper}>
                    <TextInput
                      style={styles.dimensionInput}
                      placeholder="สูง (เซนติเมตร)"
                      placeholderTextColor="#000"
                      value={Fheight ? Fheight.toString() : ''}
                      onChangeText={(text) => setHeight(parseFloat(text))}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.dimensionInputWrapper}>
                    <TextInput
                      style={styles.dimensionInput}
                      placeholder="น้ำหนัก (กิโลกรัม)"
                      placeholderTextColor="#000"
                      value={Fweight ? Fweight.toString() : ''}
                      onChangeText={(text) => setWeight(parseFloat(text))}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.dimensionInputContainer}>
                  <View style={styles.dimensionInputWrapper}>
                    <TextInput
                      style={styles.dimensionInput}
                      placeholder="ค่า QC"
                      placeholderTextColor="#000"
                      value={Fqc ? Fqc.toString() : ''}
                      onChangeText={(text) => setQc(parseFloat(text))}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.dimensionInputWrapper}>
                    <TextInput
                      style={styles.dimensionInput}
                      placeholder="ค่า ตีลัง"
                      placeholderTextColor="#000"
                      value={Fbox ? Fbox.toString() : ''}
                      onChangeText={(text) => setBox(parseFloat(text))}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.dimensionInputContainer}>
                  <View style={styles.dimensionInputWrapper}>
                    <TextInput
                      style={styles.dimensionInput}
                      placeholder="หมายเลขตู้"
                      placeholderTextColor="#000"
                      value={FcontainerNumber ? FcontainerNumber.toString() : ''}
                      onChangeText={handleSetContainerNumber}
                    />
                  </View>
                </View>
                <View style={styles.dimensionInputContainer}>
                  <View style={styles.dimensionInputWrapper}>        
                  <TextInput
                      style={styles.dimensionInput2}
                      placeholder="หมายเหตุ"
                      placeholderTextColor="#000"
                      value={Fnote !== null ? Fnote : ''}
                      onChangeText={handleSetNote}
                      multiline={true} 
                    />
                  </View>
                </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>ตกลง</Text>
              </TouchableOpacity>
            </View>
          </Modal>        

          ) : type === "Thai" ? (
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
              <ScrollView contentContainerStyle={styles.imagePreviewContainer2} horizontal>
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
                    value={Fnote !== null ? Fnote : ''}
                    onChangeText={setNote}
                    multiline
                />
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>ตกลง</Text>
              </TouchableOpacity>
            </View>
          </Modal>
            ) : null}

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