// src/navigation/AppNavigator.tsx
// Combines Bottom Tab Navigator with a Stack Navigator
// Stack handles: Home, Tasks, TaskDetail, Profile (from tab or deeplink)
// Tab: Home | Tasks | Animations | Profile

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnimationDemoScreen from '../screens/AnimationDemoScreen';

// ── Stack param list ──────────────────────────────────────────────────────────
export type RootStackParamList = {
  Main: undefined;
  TaskDetail: { task?: any; subject?: any };
};

// ── Tab param list ────────────────────────────────────────────────────────────
export type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Animations: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ── Custom tab bar icon ───────────────────────────────────────────────────────
interface TabIconProps {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  label: string;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, label, color }) => (
  <View style={[tabStyles.iconWrap, focused && tabStyles.iconWrapActive]}>
    <Ionicons name={name} size={22} color={focused ? COLORS.primary : COLORS.textMuted} />
    {focused && <Text style={tabStyles.label}>{label}</Text>}
  </View>
);

const tabStyles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    minWidth: 46,
  },
  iconWrapActive: {
    backgroundColor: COLORS.primarySoft,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: SPACING.md,
  },
  label: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

// ── Bottom Tab Navigator ──────────────────────────────────────────────────────
const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopWidth: 0,
        height: 72,
        paddingBottom: 12,
        paddingTop: 8,
        ...SHADOWS.lg,
      },
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} label="Home" color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Tasks"
      component={TasksScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} focused={focused} label="Tasks" color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Animations"
      component={AnimationDemoScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon name={focused ? 'sparkles' : 'sparkles-outline'} focused={focused} label="Demos" color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} label="Profile" color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

// ── Root Stack (wraps tabs + detail screen) ───────────────────────────────────
const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main tab flow */}
      <Stack.Screen name="Main" component={TabNavigator} />
      {/* Detail screen pushed from any tab */}
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
