import { auth } from '@/firebaseConfig'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useState, useEffect, useCallback } from 'react'

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
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError((error as FirebaseError).message)
    } finally {
      setIsLoggingIn(false)
    }
  }, [])

  const signupUser = useCallback(async (email: string, password: string) => {
    setIsSigningUp(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError((error as FirebaseError).message)
    } finally {
      setIsSigningUp(false)
    }
  }, [])

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
