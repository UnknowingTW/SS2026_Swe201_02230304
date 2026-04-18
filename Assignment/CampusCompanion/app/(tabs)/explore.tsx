import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../theme';

export default function ExploreScreen() {
	// Simple placeholder screen — replace with your actual UI
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Explore</Text>
			<Text style={styles.subtitle}>This tab uses the local CampusCompanion theme (Fonts).</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		// use the font name from your theme (System by default)
		fontFamily: Fonts.bold,
			color: Colors.white,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 14,
			color: Colors.textLight,
		fontFamily: Fonts.regular,
		textAlign: 'center',
	},
});