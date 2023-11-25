import twilio from "../../twilio.js";
import { firestore, firebaseAuth } from "../../firebase.js";

import { TWILIO_PHONE_NUMBER } from "../../../consts.js";

const replacePrefix = (number) => {
  if (number.substring(0, 1) === "0") return number.replace("0", "+972");
};
const getOneTimePassword = async (req, res) => {
  const {
    body: { phone },
  } = req;

  try {
    if (!phone) throw new Error("You must provide a phone number");

    const fixedPhone = String(phone).replace(/[^\d]/g, "");
    const user = await firebaseAuth.getUser(fixedPhone);
    if (!user) throw new Error("User not found");

    const code = Math.floor(Math.random() * 8999 + 1000);
    const { errorMessage } = await twilio.messages.create({
      body: `Your code is ${code}`,
      from: TWILIO_PHONE_NUMBER,
      to: replacePrefix(fixedPhone),
    });
    if (errorMessage) throw new Error(errorMessage);

    const userRef = firestore.collection("user").doc(fixedPhone);
    const firestoreRes = await userRef.set({
      code,
      codeValid: true,
    });
    if (!firestoreRes._writeTime) throw new Error(firestoreRes);

    res.send({
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

export default getOneTimePassword;
