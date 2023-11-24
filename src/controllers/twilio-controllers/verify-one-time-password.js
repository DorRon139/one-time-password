import { firestore, firebaseAuth } from "../../firebase.js";

const verifyOneTimePassword = async (req, res) => {
  const {
    body: { phone, code },
  } = req;

  try {
    if (!phone || !code) throw new Error("You must provide a phone number");

    const fixedPhone = String(phone).replace(/[^\d]/g, "");
    const fixedCode = parseInt(code);

    const user = await firebaseAuth.getUser(fixedPhone);
    if (!user) throw new Error("User not found");

    const userRef = firestore.collection("user").doc(fixedPhone);
    const userCollection = (await userRef.get()).data();
    if (userCollection.code !== fixedCode || !userCollection.codeValid)
      throw new Error("Code not valid");
    const firestoreRes = await userRef.set({
      codeValid: false,
    });
    if (!firestoreRes._writeTime) throw new Error(firestoreRes);

    const token = await firebaseAuth.createCustomToken(fixedPhone);

    return res.send({ token });
  } catch (error) {
    res.status(422).send({ error });
  }
};

export default verifyOneTimePassword;
