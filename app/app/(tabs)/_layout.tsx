// Expo
import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
// RN
import { View, Text, Image } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#740001', 
      tabBarShowLabel: false,
      headerTitle: (title)=> (<View className={'w-full flex-row items-center justify-between gap-3'}>
        <Text className={'font-bold text-xl'}>{title.children}</Text>
        <Image className={'h-10 w-10 rounded-lg'} source={require('../../assets/icon.png')}/>
      </View>)
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