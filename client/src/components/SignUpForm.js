import { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import axios from "axios";

const SERVER_URL = "https://ce13-109-186-36-198.ngrok.io/api";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const phoneChangeHandler = (text) => {
    setPhone(text);
  };
  const onSubmitHandler = async (event) => {
    try {
      await axios.post(
        `${SERVER_URL}/user/createUser`,
        { phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await axios.post(
        `${SERVER_URL}/twilio/getOneTimePassword`,
        { phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <Input
          label="Enter Phone Number"
          onChangeText={phoneChangeHandler}
          keyboardType="numeric"
        />
      </View>
      <Button onPress={onSubmitHandler}>SIGN UP</Button>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default SignUpForm;
