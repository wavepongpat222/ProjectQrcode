import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "./layout";

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#72ecfd', // Light blue
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#FFFFFF', // White
    borderRadius: 10,
    padding: 20,
    width: '90%',
    height: '100%', // Full screen height
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
    width: '100%',
  },
  uploadContainer: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  uploadImage: {
    width: widthPercent(12),
    height: heightPercent(10),
    marginBottom: 10,
  },
  mainImage: {
    width: widthPercent(50),
    height: heightPercent(20),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: widthPercent(11.5),
  },
  imageScrollView: {
    flexDirection: 'row',
  },
  uploadedImage: {
    width: widthPercent(22),
    height: heightPercent(16),
    marginRight: 10,
    borderRadius: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#72ecfd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    width: '100%', // Input covers the full width of the section
    color: '#000',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: "#06aed4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%', // Button covers the full width of the section
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center', // Center the text within the button
  },
});
