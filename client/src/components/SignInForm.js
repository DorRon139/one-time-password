import axios from "axios";
import { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../../firebase";
const SERVER_URL = "https://ce13-109-186-36-198.ngrok.io/api";

const SignInForm = () => {
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const phoneChangeHandler = (text) => {
    setPhone(text);
  };
  const codeChangeHandler = (text) => {
    setCode(text);
  };
  const onSubmitHandler = async (event) => {
    try {
      const {
        data: { token },
      } = await axios.post(
        `${SERVER_URL}/twilio/verifyOneTimePassword`,
        { phone, code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      signInWithCustomToken(auth, token);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <View>
      <Input
        style={{ marginBottom: 10 }}
        label="Enter Phone Number"
        onChangeText={phoneChangeHandler}
        keyboardType="numeric"
      />
      <Input
        style={{ marginBottom: 10 }}
        label="Enter Code"
        onChangeText={codeChangeHandler}
        keyboardType="numeric"
      />
      <Button onPress={onSubmitHandler}>SIGN IN</Button>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default SignInForm;
