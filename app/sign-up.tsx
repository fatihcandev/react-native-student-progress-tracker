import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text, TextInput, useTheme } from 'react-native-paper'
import { Link, Redirect, router } from 'expo-router'
import { useAuth } from '@/hooks'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const theme = useTheme()
  const { signupUser, error, clearError, isSigningUp, user } = useAuth()

  if (user) {
    return <Redirect href="/" />
  }

  const handleSignup = async () => {
    await signupUser(email, password)
    router.push('/sign-in')
  }
  return (
    <>
      <View style={styles.container}>
        <TextInput
          keyboardType="email-address"
          textContentType="emailAddress"
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          textContentType="password"
          label="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button loading={isSigningUp} mode="contained" onPress={handleSignup}>
          {isSigningUp ? 'Signing up...' : 'Sign up'}
        </Button>
        <Text>
          Already have an account?{' '}
          <Link
            href="/sign-in"
            style={{
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}
          >
            Sign in
          </Link>
        </Text>
      </View>
      {error && (
        <Snackbar visible={!!error} duration={3000} onDismiss={clearError}>
          {error}
        </Snackbar>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
})
