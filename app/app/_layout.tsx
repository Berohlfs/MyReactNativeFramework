// Global CSS file
import "../global.css"
// Expo
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="character/[id]" options={{headerTitle: 'Character Info'}} />
        <Stack.Screen name="book/[id]" options={{headerTitle: 'Book Info'}} />
        <Stack.Screen name="movie/[id]" options={{headerTitle: 'Movie Info'}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  )
}