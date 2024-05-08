import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const widthPercent = (percent: number) => (width * percent) / 100;
export const heightPercent = (percent: number) => (height * percent) / 100;