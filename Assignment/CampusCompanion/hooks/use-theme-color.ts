/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '../theme';
import { useColorScheme } from './use-color-scheme';

// Return a color value either from props (light/dark) or from the theme colors
export function useThemeColor(
  props: { light?: string; dark?: string } = {},
  colorName: keyof typeof Colors
) {
  const theme = useColorScheme(); // expected 'light' | 'dark'
  const colorFromProps = theme === 'dark' ? props.dark : props.light;
  if (colorFromProps) return colorFromProps;
  return Colors[colorName];
}
