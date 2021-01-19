import firebase from 'firebase/app';
// eslint-disable-next-line
import 'firebase/auth';
// eslint-disable-next-line
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
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
    const userDoc = await auth.createUserWithEmailAndPassword(email, password);
    await userDoc.user?.updateProfile({
      displayName: name,
    })
    const { user } = userDoc;
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
    if (!user) throw new Error('Invalid data')
    await snapshot(user);
    return;
  } catch (error) {
    // eslint-disable-next-line
      alert(error.message);
  }
};

const generateId = (): string => uuidv4();

export const addTask = async (task: string, userId: string) => {
  const id = generateId();
  const tasksRef = await (
    await firebase.firestore().doc(`tasks/${userId}`).get()
  ).exists;
  if (!tasksRef) {
    await firebase
      .firestore()
      .doc(`tasks/${userId}`)
      .set({ [id]: task });
  } else {
    await firebase
      .firestore()
      .doc(`tasks/${userId}`)
      .update({ [id]: task });
  }
};

export const addATask = async (task: string, userId: string) => {
  const id = generateId();
  await firebase.firestore().collection('tasks').add({
    userId,
    id,
    task,
    created: firebase.firestore.FieldValue.serverTimestamp(),
  });
};


export const getUpdatedTasks = async (userId: string) => {
  const tasksRef = await firebase
    .firestore()
    .collection('tasks')
    .where('userId', '==', userId);
 
  return tasksRef;
};

export const deleteTask = async (id:string) => {
  await firebase.firestore().collection('tasks').doc(id).delete();
}
