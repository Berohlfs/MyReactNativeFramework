// Expo
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
// RN
import { Image } from 'react-native'
// Styling
import { useColorScheme } from "nativewind"
import { colors } from "../../theme/colors"
// Components
import { CustomText, CustomView } from '../../components/generic'

export default function TabLayout() {

  const { colorScheme } = useColorScheme()

  const backgroundColor = colorScheme === 'dark' ? colors.background.dark : colors.background.light
  const textColor = colorScheme === 'dark' ? colors.text.dark : colors.text.light
  const borderColor = colorScheme === 'dark' ? colors.divider.dark : colors.divider.light
  const primaryColor = colorScheme === 'dark' ? colors.primary.dark : colors.primary.light

  return (
    <Tabs screenOptions={{ 
      tabBarHideOnKeyboard: true,
      headerStyle: { backgroundColor },
      tabBarStyle: { backgroundColor, borderColor },
      tabBarActiveTintColor: primaryColor, 
      tabBarInactiveTintColor: textColor,
      tabBarShowLabel: false,
      headerShadowVisible: false,
      headerTitle: (title)=> (<CustomView className={'w-full flex-row items-center justify-between gap-3'}>
        <CustomText className={'font-bold text-xl'}>{title.children}</CustomText>
        <Image className={'h-10 w-10 rounded-lg'} source={require('../../assets/icon.png')}/>
      </CustomView>)
    }}>
      <Tabs.Screen
        name="index"
        options={{
            title: 'Characters',
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="people-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: 'Books',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="menu-book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="movie" color={color} />,
        }}
      />
    </Tabs>)
}