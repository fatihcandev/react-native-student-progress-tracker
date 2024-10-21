import { useState, useEffect, useCallback } from 'react'
import { auth, db } from '@/firebaseConfig'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const loginUser = useCallback(async (email: string, password: string) => {
    setIsLoggingIn(true)
    let user: UserCredential | null = null
    try {
      user = await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError((error as FirebaseError).message)
    } finally {
      setIsLoggingIn(false)
    }
    return user
  }, [])

  const signupUser = useCallback(
    async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) => {
      setIsSigningUp(true)
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
        const usersRef = collection(db, 'users')
        await setDoc(doc(usersRef, user.uid), {
          email,
          enrolledCourses: [],
          name,
          progress: 0,
        })
      } catch (error) {
        setError((error as FirebaseError).message)
      } finally {
        setIsSigningUp(false)
      }
    },
    [],
  )

  const logoutUser = useCallback(async () => {
    try {
      await signOut(auth)
    } catch (error) {
      setError((error as FirebaseError).message)
    }
  }, [])

  const clearError = () => {
    setError(null)
  }

  return {
    user,
    loginUser,
    signupUser,
    logoutUser,
    isLoading,
    isSigningUp,
    isLoggingIn,
    error,
    clearError,
  }
}
