import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: Colors.primary,
					borderTopWidth: 0,
				},
				tabBarActiveTintColor: Colors.secondary,
				tabBarInactiveTintColor: Colors.textLight,
				tabBarIcon: ({ color, size }) => {
					// icon rendered per screen via name mapping in each Tab.Screen
					return null;
				},
			})}
		>
							<Tabs.Screen
								name="home"
								options={{
									title: 'Home',
									tabBarIcon: ({ color, size }) => (
										<Ionicons name="home" color={color} size={size} />
									),
								}}
							/>
			<Tabs.Screen
				name="contacts"
				options={{
					title: 'Contacts',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="call" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="schedule"
				options={{
					title: 'Schedule',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="notices"
				options={{
					title: 'Notices',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="notifications" color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}