import { firebaseAuth } from "../../firebase.js";

const createUser = async (req, res) => {
  const {
    body: { phone },
  } = req;

  try {
    if (!phone) return res.status(422).send({ error: "Bad Input" });

    const fixedPhone = String(phone).replace(/[^\d]/g, "");

    const user = await firebaseAuth.createUser({ uid: fixedPhone });

    res.send(user);
  } catch (error) {
    res.status(422).send({ error });
  }
};

export default createUser;
