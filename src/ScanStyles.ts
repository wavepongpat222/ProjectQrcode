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
    fontSize: widthPercent(5), // Proportional font size
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
  },
  phcameraParent: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: Color.colorWhite,
    width: widthPercent(80),
    height: heightPercent(50),
    marginTop: heightPercent(2),
    padding: widthPercent(5),
  },
  phcameraIcon: {
    width: widthPercent(10),
    height: heightPercent(5),
    marginBottom: heightPercent(2),
    zIndex: 1,
  },
  pleaseMoveYour: {
    fontSize: widthPercent(4),
    color: "#292626",
    textAlign: "center",
    zIndex: 1,
  },
  scanChild: {
    position: 'absolute',
    width: widthPercent(56),
    height: heightPercent(27),
    left: widthPercent(10),
    top: heightPercent(35),
    margin: widthPercent(12.5),
    zIndex: 1,
  },
  centerText: {
    fontSize: widthPercent(5),
    fontWeight: 'bold',
  },
  cameraSize: {
    width: widthPercent(70),
    height: heightPercent(37.5),
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginTop: heightPercent(-12.5),
    position: 'relative',
  },
  modalView: {
    margin: widthPercent(5),
    backgroundColor: "white",
    borderRadius: 20,
    padding: widthPercent(5),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: heightPercent(0.25)
    },
    shadowOpacity: 0.25,
    shadowRadius: widthPercent(1),
    elevation: 5,
    marginTop: '50%',
    height: heightPercent(60),
    width: widthPercent(80),
    left: widthPercent(5),
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: widthPercent(2.5),
    position: 'absolute',
    right: widthPercent(2.5),
    top: widthPercent(2.5),
  },
  closeButtonText: {
    fontSize: widthPercent(6),
    fontWeight: 'bold',
    color:'#000',
  },
  modalText: {
    fontSize: widthPercent(5),
    fontWeight: 'bold',
    margin: widthPercent(5),
    textAlign: "center",
    color: '#000'
  },
  submitButton:{
    backgroundColor: '#72ecfd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: heightPercent(-6.25),
    width: widthPercent(30),
    height: heightPercent(5),
  },
  submitButtonText:{
    fontSize: widthPercent(4),
    textAlign: "center",
    color: '#000'
  },
  inputContainer: {
    backgroundColor: '#e3e3e3',
    width: widthPercent(60),
    height:heightPercent(10),
    top : heightPercent(-11),
    borderRadius: 5,
  },
  inputnote: {
    height: heightPercent(10),
    fontSize: widthPercent(4),
    color: '#000',
    textAlignVertical: 'top',
    padding: 10,
  },
  icon: {
    width: widthPercent(5),
    height: heightPercent(2.5),
    marginRight: widthPercent(1.25),
  },
  ImagePick:{
    top: heightPercent(6.25)
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: heightPercent(2.5),
  },
  imagePreview: {
    width: widthPercent(25),
    height: heightPercent(12.5),
    margin: widthPercent(2.5),
    borderRadius: 5,
  }
});

export default styles;
