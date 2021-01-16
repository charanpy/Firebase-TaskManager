import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD6t3BoQzr9afYuOXnZu2lj8EQoofvtsNQ',
  authDomain: 'todoapp-f1b9e.firebaseapp.com',
  projectId: 'todoapp-f1b9e',
  storageBucket: 'todoapp-f1b9e.appspot.com',
  messagingSenderId: '985697440739',
  appId: '1:985697440739:web:06552ec230908268e046d6',
  measurementId: 'G-GT54M7XDPP',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();

interface SignUpInfo {
  email: string;
  password: string;
}

type UserInfo = {
  name?: string;
};

export const createUserDocument = async (
  // eslint-disable-next-line
  user: any,
  additionalData?: UserInfo,
) => {
  if (!user) {
    return false;
  }
  const userRef = firebase.firestore().doc(`users/${user.uid}`);
  const userdoc = await userRef.get();
  if (!userdoc.exists) {
    try {
      const { displayName, email } = user;
      const name = displayName || additionalData?.name;
      const createdAt = new Date();
      await userRef.set({
        displayName: name,
        email,
        createdAt,
        ...additionalData,
      });
      return userRef;
    } catch (error) {
      return error;
    }
  }
  return userRef;
};

export const signUp = async (userCredentials: SignUpInfo, name: string) => {
  try {
    const { email, password } = userCredentials;
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const username = {
      name: user?.displayName || name,
    };
    return createUserDocument(user, username);
  } catch (e) {
    return e;
  }
};
// eslint-disable-next-line
const snapshot = async (user: any) => {
  try {
    const userRef = await createUserDocument(user);
    const res = await userRef.get();
    return res.data();
  } catch (e) {
    // eslint-disable-next-line
    alert('Something went wrong');
  }
};

export const signinWithGoogle = async () => {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    });
    const { user } = await auth.signInWithPopup(googleProvider);
    await snapshot(user);
    return;
  } catch (error) {
    // eslint-disable-next-line
    alert('Something went wrong');
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    await snapshot(user);
    return;
  } catch (error) {
    // eslint-disable-next-line
    alert(error.message);
  }
};
