import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// eslint-disable-next-line import/named
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'student-progress-tracker-f69e2.firebaseapp.com',
  projectId: 'student-progress-tracker-f69e2',
  storageBucket: 'student-progress-tracker-f69e2.appspot.com',
  messagingSenderId: '463659212390',
  appId: '1:463659212390:web:8f5b868674e85e8ead17a7',
  measurementId: 'G-HG43CD1VXL',
}

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(app)
