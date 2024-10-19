import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '@/hooks'

export default function Index() {
  const { logoutUser } = useAuth()
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={logoutUser}>
        Sign Out
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
