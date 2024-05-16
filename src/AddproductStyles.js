// AddproductStyles.js
import { StyleSheet } from "react-native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import { heightPercent, widthPercent } from "./layout";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#72ecfd",
  },
  textTypo: {
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  detailproductLayout: {
    height: heightPercent(17),
    width: widthPercent(70),
    position: "absolute",
  },
  childBorder: {
    borderWidth: 1,
    borderColor: Color.colorDeepskyblue_100,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    left: 0,
    top: 0,
  },
  text1Typo: {
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  productnameLayout: {
    height: heightPercent(7),
    width: widthPercent(70),
    position: "absolute",
  },
  addpicture2Layout: {
    height: heightPercent(12),
    width: widthPercent(20),
    position: "absolute",
  },
  materialIconLayout: {
    width: widthPercent(7),
    top: heightPercent(1.5),
    height: heightPercent(4),
    position: "absolute",
    overflow: "hidden",
  },
  addpictureLayout: {
    width: widthPercent(70),
    height: heightPercent(7),
    position: "absolute",
  },
  submitbuttonChild: {
    backgroundColor: "rgba(172, 132, 231, 0.5)",
    borderRadius: Border.br_8xs,
    left: 0,
    top: 0,
    height: heightPercent(5),
    width: widthPercent(60),
    position: "absolute",
  },
  text: {
    left: widthPercent(16),
    width: widthPercent(27),
    height: heightPercent(2.5),
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    top: heightPercent(1.25),
  },
  submitbutton: {
    top: heightPercent(73),
    left: widthPercent(14),
    height: heightPercent(5),
    width: widthPercent(60),
    position: "absolute",
  },
  detailproductChild: {
    height: heightPercent(17),
    width: widthPercent(70),
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  text1: {
    width: widthPercent(27),
    height: heightPercent(2.5),
    top: heightPercent(1.25),
    color: Color.colorBlack,
    left: 0,
  },
  detailproduct: {
    top: heightPercent(51),
    left: widthPercent(9),
  },
  productnameChild: {
    borderWidth: 1,
    borderColor: Color.colorDeepskyblue_100,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    left: 0,
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  text2: {
    left: 5,
    width: widthPercent(15),
    height: heightPercent(3.75),
    top: heightPercent(2),
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  productname: {
    top: heightPercent(43),
    left: widthPercent(9),
  },
  addpicture2Child: {
    backgroundColor: "#f2f2f2",
    borderColor: "#e6e7e8",
    borderWidth: 3,
    borderStyle: "solid",
    height: heightPercent(12),
    width: widthPercent(20),
    left: -15,
    top: 0,
  },
  materialSymbolsuploadIcon: {
    left: widthPercent(3),
  },
  upload: {
    top: heightPercent(8),
    width: widthPercent(11),
    height: heightPercent(2.5),
    left: widthPercent(1),
  },
  addpicture2: {
    top: heightPercent(24),
    left: widthPercent(37),
  },
  addpictureChild: {
    backgroundColor: "rgba(6, 174, 212, 0.2)",
    borderWidth: 1,
    borderColor: Color.colorDeepskyblue_100,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    left: -15,
    top: 0,
  },
  text3: {
    left: widthPercent(10),
    color: Color.colorDeepskyblue_100,
    width: widthPercent(50),
    height: heightPercent(3.75),
    top: heightPercent(2.5),
    textAlign: "center",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  materialSymbolsuploadIcon1: {
    left: widthPercent(5),
  },
  addpicture: {
    top: heightPercent(9.5),
    left: widthPercent(11),
  },
  submitbuttonParent: {
    borderRadius: 15,
    width: widthPercent(85),
    height: heightPercent(80),
    backgroundColor: Color.colorWhite,
    position: "absolute",
    overflow: "hidden",
  },
  text4: {
    top: heightPercent(-1.5),
    left: widthPercent(40),
    fontSize: 20,
    width: widthPercent(54),
    height: heightPercent(7.5),
  },
  addproduct: {
    width: widthPercent(100),
    height: heightPercent(100),
    alignItems: "center",
    justifyContent: "center",
  },
});
