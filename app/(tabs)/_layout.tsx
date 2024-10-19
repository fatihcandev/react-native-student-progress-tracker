import { Redirect, Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { useAuth } from '@/hooks'

export default function TabLayout() {
  const theme = useTheme()
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!user) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? 'information-circle' : 'information-circle-outline'
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  )
}
