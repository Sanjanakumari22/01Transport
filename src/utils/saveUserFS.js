// saveUserFS.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore initialized here

export const saveUserFS = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data);
};
