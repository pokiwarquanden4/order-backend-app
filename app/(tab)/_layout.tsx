import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
        }}
        name='home'></Tabs.Screen>
      <Tabs.Screen
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => <Ionicons name="menu" size={24} color={color} />
        }}
        name='menu'></Tabs.Screen>
    </Tabs>
  )
}