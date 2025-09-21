import { admin, firestore } from "../../firebase.js";
import { fetchJson } from "../../utils/fetch.js";
import type { UserProfile } from "./auth.types.js";

export async function getLineProfile(lineAccessToken: string) {
  const profileUrl = "https://api.line.me/v2/profile";
  const headers = { Authorization: `Bearer ${lineAccessToken}` };
  const profile = await fetchJson<UserProfile>(profileUrl, { headers });

  return profile;
}

export async function createOrUpdateFirebaseAuthUser(lineUserProfile: UserProfile) {
  const { displayName, pictureUrl: photoURL, userId: uid } = lineUserProfile;

  try {
    await admin.auth().updateUser(uid, { displayName, photoURL });
    console.log("Firebase Auth user updated");
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      await admin.auth().createUser({ uid, displayName, photoURL });
      console.log("Firebase Auth user created");
    } else {
      throw error;
    }
  }
}

export async function createOrUpdateUserInDb(lineUserProfile: UserProfile) {
  const { userId: lineUserId, displayName, pictureUrl } = lineUserProfile;
  const userRef = firestore.collection("Users").doc(lineUserId);
  const timestamp = admin.firestore.FieldValue.serverTimestamp();
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const updatedAt = timestamp;
    await userRef.update({ displayName, pictureUrl, updatedAt });
    console.log("Firestore user updated");
  } else {
    const createdAt = timestamp;
    await userRef.set({ lineUserId, displayName, pictureUrl, createdAt });
    console.log("Firestore user created");
  }
}
