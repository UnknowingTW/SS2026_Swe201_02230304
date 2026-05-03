# Assignment 2 Report — StudentPlanner App

**Module:** SWE201 — BE Software Engineering  
**Assignment:** Build a Multi-Screen Mobile App with Smooth Animations and Gesture Interaction  
**Framework:** React Native (Expo) with TypeScript  
**Student:** Alex Johnson  

---

## 1. App Idea

**StudentPlanner** is a mobile productivity app designed for secondary and tertiary students to manage their academic workload. It allows students to view and complete tasks across different subjects, track their progress, and stay organised with a clean, polished interface.

The app is fully frontend-only — all data is sourced from a local mock data file (`src/data/mockData.ts`) with no backend, API calls, or database integration.

---

## 2. Screens Overview

| Screen | Description |
|---|---|
| **Home Screen** | Dashboard with greeting, weekly calendar strip, quick actions, today's tasks, and upcoming tasks |
| **Tasks Screen** | Subject category grid + filterable full task list (All / Today / Pending / Done) |
| **Task Detail Screen** | Full task view with hero header, description, tags, time estimate, and completion toggle |
| **Profile Screen** | Student profile, overall progress bars per subject, achievements grid, settings toggles, account actions |
| **Animation Demo Screen** | Dedicated showcase for all 6 animation/gesture types |

---

## 3. Navigation Flow

```
App.tsx
└── GestureHandlerRootView
    └── SafeAreaProvider
        └── NavigationContainer
            └── Stack.Navigator (RootStack)
                ├── "Main"  →  Tab.Navigator (Bottom Tabs)
                │             ├── Home      (HomeScreen)
                │             ├── Tasks     (TasksScreen)
                │             ├── Animations (AnimationDemoScreen)
                │             └── Profile   (ProfileScreen)
                │
                └── "TaskDetail"  →  TaskDetailScreen
                                     (slide_from_bottom animation)
```

- **Stack Navigation:** `Main → TaskDetail` is a stack push, entered from both the Home screen (task card tap) and the Tasks screen. The TaskDetail screen uses a `slide_from_bottom` transition.  
- **Tab Navigation:** A custom-styled bottom tab bar with icon + label for the active tab. The four tabs cover all major areas of the app.

---

## 4. Animations Used

### 4.1 Staggered Fade + Slide In (Home Screen)
Six independent `Animated.Value` pairs (opacity + translateY) are animated in sequence on mount using `Animated.stagger()`. Each section of the home screen — header, stats banner, week strip, quick actions, today's tasks, upcoming tasks — fades in and slides up with an 80 ms offset between each.

**API used:** `Animated.timing` + `Animated.stagger`

---

### 4.2 Animated Progress Bar (ProgressBar Component, Profile Screen)
The `ProgressBar` component animates from `0%` to the target width using `Animated.timing` on mount. It uses a non-native-driver interpolation on the `width` style property. Subject-specific bars in the Profile screen are each staggered with a `delay` prop.

**API used:** `Animated.timing` + `width` interpolation

---

### 4.3 Scale / Bounce (TaskCard, AnimatedButton, AnimationDemoScreen)
All interactive cards use a `spring` animation with `bounciness` on press-in/press-out, giving a satisfying tactile feel. The "Bounce!" demo on the Animation screen triggers a `sequence` — scale up to 1.35, then spring back with high bounciness.

**API used:** `Animated.spring` + `Animated.sequence`

---

### 4.4 Rotating Loader (AnimationDemoScreen)
An `Animated.loop` wraps a `Animated.timing` call that rotates the value from 0→1, interpolated to `0deg→360deg`. The loop runs indefinitely until the user stops it.

**API used:** `Animated.loop` + `Animated.timing` + `interpolate` (rotate)

---

### 4.5 Gesture-Driven Drag (AnimationDemoScreen)
A draggable card is controlled by `PanResponder`. On drag start, the current offset is flattened; on move, the card follows the finger using `Animated.event`. On release, `Animated.spring` returns the card to its original position with bounce.

**API used:** `PanResponder` + `Animated.ValueXY` + `Animated.spring`

---

### 4.6 Hero Slide-Up Entrance (TaskDetailScreen)
When a task detail screen opens, the hero header slides in from above (`translateY: -60 → 0`) and the body slides up from below (`translateY: 50 → 0`), each with opacity fade-in. A 150 ms delay staggers the two sections for a layered feel.

**API used:** `Animated.spring` + `Animated.parallel`

---

### 4.7 Completion Bounce (TaskDetailScreen)
Tapping "Mark as Complete" triggers a `sequence` of two spring animations — a quick scale-up to 1.15 followed by a spring-back with high bounciness — centred on the status badge.

**API used:** `Animated.sequence` + `Animated.spring`

---

### 4.8 Animated Progress Sequence (AnimationDemoScreen)
A bar fills from 0% to 100% over 2 seconds using a single `Animated.timing` with `useNativeDriver: false` and `width` interpolation.

---

## 5. Gesture Interactions

| Interaction | Where | Implementation |
|---|---|---|
| **Tap** | All interactive elements | `TouchableOpacity` with scale feedback |
| **Press & Hold (long press)** | TaskCard toggle checkbox | `TouchableOpacity` onPress |
| **Drag** | AnimationDemoScreen drag card | `PanResponder` with spring-back |
| **Swipe / Scroll** | All list screens | `ScrollView` + horizontal `ScrollView` for filter pills |

---

## 6. Reusable Components

| Component | Props | Used On |
|---|---|---|
| `TaskCard` | `task`, `onPress`, `onToggle`, `index` | Home, Tasks |
| `ProgressBar` | `progress`, `color`, `height`, `showLabel`, `label`, `delay` | Profile, SubjectCard |
| `AnimatedButton` | `title`, `onPress`, `variant`, `color` | TaskDetail |
| `SubjectCard` | `subject`, `onPress`, `delay` | Tasks |

---

## 7. Project Structure

```
StudentPlanner/
├── App.tsx                    # Entry point
├── package.json
├── tsconfig.json
├── babel.config.js
├── app.json
└── src/
    ├── navigation/
    │   └── AppNavigator.tsx   # Stack + Tab setup
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── TasksScreen.tsx
    │   ├── TaskDetailScreen.tsx
    │   ├── ProfileScreen.tsx
    │   └── AnimationDemoScreen.tsx
    ├── components/
    │   ├── TaskCard.tsx
    │   ├── ProgressBar.tsx
    │   ├── AnimatedButton.tsx
    │   └── SubjectCard.tsx
    ├── constants/
    │   └── theme.ts           # Colors, fonts, spacing, shadows
    └── data/
        └── mockData.ts        # All static data
```

---

## 8. Design Decisions

- **Indigo/Violet primary palette** — professional and visually calm for a student context, but distinctive enough to be memorable.
- **Consistent spacing system** — all spacing values reference the `SPACING` constant, ensuring visual rhythm across all screens.
- **Coloured subject system** — each subject has a dedicated colour used consistently in cards, progress bars, and badges, making subjects instantly recognisable.
- **Shadow system** — three levels of shadow (`sm`, `md`, `lg`) using a tinted indigo shadow for a softer, more modern look compared to pure black shadows.
- **Custom tab bar** — the active tab expands to show the label alongside the icon, creating a pill-shaped active indicator that is both informative and visually appealing.

---

## 9. Running the App

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# Run on device/simulator
npx expo start --ios      # iOS
npx expo start --android  # Android
```

> Requires Expo Go app on device, or a configured iOS/Android simulator.

---

## 10. Summary of Requirements Met

| Requirement | Status |
|---|---|
| Multi-screen navigation | ✅ 5 screens |
| Stack navigation flow | ✅ Root stack: Main → TaskDetail |
| Tab navigation flow | ✅ 4-tab bottom navigator |
| Responsive layout | ✅ SafeAreaView + percentage widths |
| ≥ 2 animations (Animated API) | ✅ 8 distinct animations |
| ≥ 1 gesture interaction | ✅ Drag (PanResponder) + tap scale feedback |
| Screen transition animation | ✅ `slide_from_bottom` on TaskDetail |
| ≥ 1 reusable component | ✅ 4 reusable components |
| No backend / API / DB | ✅ All data in `mockData.ts` |
| Fade in/out | ✅ Home screen stagger, Animation Demo |
| Slide animation | ✅ TaskDetail hero, Demo screen |
| Scale / bounce | ✅ TaskCard, AnimatedButton, Demo |
| Gesture-driven draggable | ✅ PanResponder drag card |
| Animated progress indicator | ✅ ProgressBar component |
| Consistent UI design | ✅ Unified theme.ts system |
