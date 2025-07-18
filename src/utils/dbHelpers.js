// src/utils/dbHelpers.js
import { db } from '../firebase';
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getDocs, query, where, onSnapshot } from "firebase/firestore";


/** Add a new booking (auto‑ID)  */
export const addBookingFS = async (booking) => {
  const ref = await addDoc(collection(db, 'bookings'), {
    ...booking,
    createdAt: serverTimestamp()
  });
  return ref.id; // return Firestore‑generated ID
};

/** Save/update a user profile by UID  */
export const saveUserFS = (uid, data) =>
  setDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });

export const listenToUserBookings = (userId, callback) => {
  const bookingsRef = collection(db, 'bookings');
  const q = query(bookingsRef, where('userId', '==', userId));

  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(bookings);
  });
};