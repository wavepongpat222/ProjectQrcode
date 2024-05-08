import { StyleSheet } from 'react-native';
import { FontFamily, Color } from '../GlobalStyles';
import { heightPercent, widthPercent } from './layout';

 const styles = StyleSheet.create({
  scan: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#72ecfd",
  },
  scanQrCode: {
    fontSize: 20,
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
  },
  phcameraParent: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: Color.colorWhite,
    width: 332,
    height: 432,
    marginTop: 20,
    padding: 20,
  },
  phcameraIcon: {
    width: 40,
    height: 35,
    marginBottom: 20,
    zIndex: 1, 
  },
  pleaseMoveYour: {
    fontSize: 15,
    color: "#292626",
    textAlign: "center",
    zIndex: 1, 
  },
  scanChild: {
    position: 'absolute', 
    width: 222,
    height: 216,
    left: 50,
    top: 300,
    margin: 50,
    zIndex: 1, 
  },
  centerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cameraSize: {
    width: 300,
    height: 300,
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginTop: -100,
    position: 'relative',  
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: '50%',
    height: heightPercent(60),
    width : widthPercent(80),
    left : 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#000',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    textAlign: "center",
    color: '#000'
  },
  submitButton:{
    backgroundColor: '#72ecfd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: -50,
    width: widthPercent(30),
    height: heightPercent(5),
  },
  submitButtonText:{
    fontSize: 15,
    textAlign: "center",
    color: '#000'
  },
  inputContainer: {
    backgroundColor: '#e3e3e3',
    width: widthPercent(50),
    top : -100,
    borderRadius: 5,
  },
  inputnote: {
    height: 40,
    fontSize: 16,
    color: '#000',  
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  ImagePick:{
    top: 50
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
  }
});

export default styles;