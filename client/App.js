import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Divider } from "@rneui/base";

import SignUpForm from "./src/components/SignUpForm";
import SignInForm from "./src/components/SignInForm";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <SignUpForm />
      <Divider />
      <SignInForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
