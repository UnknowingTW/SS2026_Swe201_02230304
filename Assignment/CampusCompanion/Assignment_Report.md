CampusCompanion — Assignment Report

Name: [Your Name]
Course: SWE201 — Software Engineering
Assignment: CampusCompanion App
Date: April 18, 2026

---

Abstract

A short summary of the work. I fixed runtime and routing problems in the CampusCompanion app so the main screens and bottom navigation work. I also improved color usage so text is visible in dark mode.

---

1. Introduction

This report describes the changes I made to the CampusCompanion project to get it working correctly. The app originally had routing and theme issues that caused blank screens and runtime errors.

2. Problem Statement

- The app showed an "Unmatched Route" page and some screens were missing the bottom navigation.
- The app crashed at runtime due to a problem in the theme exports.
- Some text was hard to read in dark mode because colors were hard-coded.

3. Design and Plan

I planned these steps:

- Fix the broken theme helper function.
- Remove the CommonJS exports that caused the bundler error.
- Ensure the `(tabs)` route group has a default index and a proper Tabs layout so the bottom bar appears.
- Replace hard-coded text colors with theme colors on key screens.
- Re-export existing screen components as tab screens so the router can load them.

4. Implementation (what I changed)

Files changed and purpose:

- `hooks/use-theme-color.ts` — corrected the function so it returns a theme color correctly.
- `theme.js` — removed a CommonJS `module.exports` block that caused a runtime TypeError; kept ES module exports.
- `components/themed-text.tsx` — used a valid color key from the theme so text color is correct.
- `components/ui/collapsible.tsx` — imported the theme correctly and used existing color keys for icons.
- `app/modal.tsx` — updated the `Link` to use a valid route.
- `app/(tabs)/_layout.tsx` — implemented a Tabs layout using `expo-router` and Ionicons so the bottom tab bar renders.
- `app/(tabs)/index.tsx` — added an index file so the `(tabs)` group has a default route.
- `app/(tabs)/home.tsx`, `contacts.tsx`, `schedule.tsx`, `notices.tsx` — re-exported the real screens so each tab maps to an actual screen file.
- `app/(tabs)/explore.tsx` — updated styles to use theme colors so text is readable in dark mode.

5. Screenshots

(Insert screenshots here)

- [IMAGE: home_screen_placeholder]
- [IMAGE: tabs_and_navigation_placeholder]

6. Important code snippets

(Insert code snippets here. Leave blank to paste later.)

Example placeholder:

```js
// paste the main fixed code excerpt here
```

7. How I tested

Commands I ran to verify the project:

```bash
cd Assignment/CampusCompanion
npx tsc --noEmit   # Type-check
npx expo start     # Start dev server and open with Expo Go
```

I verified:
- TypeScript type-check passes.
- The bottom tab bar and icons appear.
- Key screens show readable text in dark mode.

8. Known issues and notes

- Run commands from `Assignment/CampusCompanion` (not the repository root) to avoid locating the wrong `package.json`.
- If Expo shows "Unmatched Route" again, restart with a cleared cache:

```bash
npx expo start -c
```

9. Next steps (optional improvements)

- Replace remaining hard-coded colors with theme-based colors across all screens.
- Make a nested `Colors.light` / `Colors.dark` map in `theme.js` for clearer theming.
- Improve the tab bar design (spacing, fonts, shadow) to match original visuals.

10. Conclusion

I fixed routing and theme issues, restored the bottom tab navigation and icons, and made screen text visible in dark mode. The app now builds and the main UI is usable.

---

Appendix: How to run (for the grader)

1. Open terminal and go to the project folder:

```bash
cd Assignment/CampusCompanion
```

2. Install dependencies (if needed):

```bash
npm install
# or
yarn
```

3. Type-check and run:

```bash
npx tsc --noEmit
npx expo start
```



