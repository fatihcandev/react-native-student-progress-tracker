import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text, TextInput, useTheme } from 'react-native-paper'
import { Link, Redirect, router } from 'expo-router'
import { useAuth } from '@/hooks'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const theme = useTheme()
  const { loginUser, error, clearError, isLoggingIn, user } = useAuth()

  if (user) {
    return <Redirect href="/" />
  }

  const handleLogin = async () => {
    await loginUser(email, password)
    router.push('/')
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
        <Button loading={isLoggingIn} mode="contained" onPress={handleLogin}>
          {isLoggingIn ? 'Signing in...' : 'Sign in'}
        </Button>
        <Text>
          Don't have an account?{' '}
          <Link
            href="/sign-up"
            style={{
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}
          >
            Sign up
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
