// Styling
import "../global.css"
import { useColorScheme } from "nativewind"
import { colors } from "../theme/colors"
// Expo
import { Stack } from 'expo-router'
import * as NavigationBar from 'expo-navigation-bar'
// RN
import { Image} from "react-native"
// Components
import { CustomText, CustomView } from "../components/index"
// React
import { useEffect } from "react"

export default function RootLayout() {

  const { colorScheme, setColorScheme } = useColorScheme()

  const backgroundColor = colorScheme === 'dark' ? colors.background.dark : colors.background.light

  const textColor = colorScheme === 'dark' ? colors.text.dark : colors.text.light

  NavigationBar.setBackgroundColorAsync(backgroundColor)
  NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark')

  useEffect(()=> {
    setColorScheme('system')
  }, [])

  return (
    <CustomView>
      <Stack screenOptions={{
        animation: 'fade',
        headerShadowVisible: false,
        headerStyle: { backgroundColor },
        headerTintColor: textColor,
        headerTitle: (title)=> <CustomText className={'font-bold text-xl'}>{title.children}</CustomText>,
        headerRight: ()=> <Image className={'h-10 w-10 rounded-lg'} source={require('../assets/icon.png')}/>
      }}>
        <Stack.Screen name="character/[id]" options={{title: 'Character Info'}} />
        <Stack.Screen name="book/[id]" options={{title: 'Book Info'}} />
        <Stack.Screen name="movie/[id]" options={{title: 'Movie Info'}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CustomView>)
}