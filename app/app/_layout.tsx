// Global CSS file
import "../global.css"
// Expo
import { Stack } from 'expo-router'
// RN
import { View, Image, Text} from "react-native"

export default function RootLayout() {
  return (
      <Stack screenOptions={{ 
        headerTitle: (title)=> <Text className={'font-bold text-xl'}>{title.children}</Text>,
        headerRight: ()=> <View><Image className={'h-10 w-10 rounded-lg'} source={require('../assets/icon.png')}/></View>
      }}>
        <Stack.Screen name="character/[id]" options={{title: 'Character Info'}} />
        <Stack.Screen name="book/[id]" options={{title: 'Book Info'}} />
        <Stack.Screen name="movie/[id]" options={{title: 'Movie Info'}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  )
}