Practical2App

A minimal 3-screen Expo / React Native example for Practical 2.

Files added:
- App.js - root navigation (React Navigation stack)
- screens/HomeScreen.js
- screens/DetailsScreen.js
- screens/SettingsScreen.js

How to run locally

1. Install Expo CLI if you don't have it (optional):
   npm install -g expo-cli

2. From this folder run:
   npm install

3. Start the app using Expo:
   npx expo start

Dependencies (you'll install them via npm in step 2):
- expo
- react
- react-native
- @react-navigation/native
- @react-navigation/native-stack
- react-native-screens
- react-native-safe-area-context

If you prefer, create a new Expo app with the managed workflow and copy these files in. For example:

npx create-expo-app Practical2App
# then copy files into the generated project and run `npx expo start` inside it.
