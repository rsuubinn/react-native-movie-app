import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";

const StackNavigator = createNativeStackNavigator();

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Go to Search</Text>
  </TouchableOpacity>
);

export default function Stack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <StackNavigator.Screen name="One" component={ScreenOne} />
      <StackNavigator.Screen name="Two" component={ScreenTwo} />
      <StackNavigator.Screen name="Three" component={ScreenThree} />
    </StackNavigator.Navigator>
  );
}
