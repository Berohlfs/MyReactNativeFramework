import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#740001', tabBarShowLabel: false }}>
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