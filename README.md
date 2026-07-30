# StudentWellnessApp (Owlness)

A student mental wellness app for Kennesaw State University — mood check-ins, journaling, guided wellness content, campus events (OwlLife), and settings/notifications. Built with **React Native + Expo Router**, deployed as both a mobile app and a web app.

- **Live web app:** https://studentwellnessapp-bf2e1.web.app
- **Firebase project:** `studentwellnessapp-bf2e1`

## Tech Stack

- **Framework:** Expo (SDK 54) + Expo Router (file-based routing)
- **UI:** React Native, React Native Web (for the web build)
- **Backend:** Firebase Auth + Firestore
- **Storage:** AsyncStorage (local device data — PIN, profile image path, etc.)
- **Media:** expo-image-picker, expo-file-system
- **Notifications:** expo-notifications
- **Web hosting:** Firebase Hosting

## Branch Structure

- `development` — main working branch, all active development happens here
- `main` — production branch

## Project Structure

```
app/                          # Expo Router screens (file-based routing)
  index.jsx                   # Sign In screen
  signup.jsx                  # Create Account screen
  welcome.jsx                 # Landing screen
  _layout.jsx                 # Root layout
  journal/
    new-entry.jsx             # Journal entry editor screen
    _layout.jsx
  (tabs)/                     # Bottom tab screens
    home.jsx
    journal.jsx
    wellness.jsx
    campus.jsx                # OwlLife tab
    settings.jsx
    _layout.jsx

components/
  home/                       # Home screen widgets (mood picker, insight, resources, etc.)
  journal/                    # Journal templates, past entries, passcode toggle, rich text editor
  wellness/                   # Mood calendar, relaxing techniques, wellbeing topics
  campus/                     # Campus map + event list/filter (OwlLife)
  settings/                   # Profile, notifications, customization, counselor contact
  shared/                     # Shared components (TopBar, PinSetupModal)
  ui/                         # Low-level UI primitives

context/
  ThemeContext.jsx            # Background theme, quotes, templates, profile image state

constants/
  Colors.js                   # App color palette
  eventsData.js                # Campus events data

firebase/
  config.js                   # Firebase app/auth/firestore initialization

utils/
  alert.js                    # Cross-platform confirm()/notify() helper (see note below)

dashboard/                    # Separate, not-yet-built-out Vite/React admin dashboard scaffold (untracked, not part of the Expo app)
```

## ⚠️ Web Platform Notes (read before touching web-facing code)

React Native's web target (`react-native-web`) does **not** support everything native RN supports. Two things already bit us once — keep these in mind:

1. **`Alert.alert()` is a silent no-op on web.** Any confirm dialog or error message written with `Alert.alert` will show nothing in the browser and any action tied to its buttons will never fire. Use `utils/alert.js`'s `confirmAction()` / `notify()` helpers instead — they route to `Alert.alert` on native and `window.confirm` / `window.alert` on web.
2. **`react-native-webview` (used by `react-native-pell-rich-editor`) does not run on web at all.** The journal entry rich text editor therefore uses a platform split: native uses `RichEditor`/`RichToolbar`, web uses the custom `components/journal/WebRichEditor.jsx` (a `contentEditable` div + toolbar using `document.execCommand`). See `app/journal/new-entry.jsx` for the `Platform.OS === 'web'` branch.
3. **`firebase.json`'s `ignore` list must not use `**/node_modules/**`.** Icon fonts from `@expo/vector-icons` get exported into `dist/assets/node_modules/...` by the web build — a recursive ignore glob strips them out of the Firebase Hosting deploy, so icons silently fail to load in the browser. Keep it scoped to `node_modules/**` (root only).

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root (not committed to git) with your Firebase web config:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

Get these values from the Firebase Console → Project Settings → General → Your apps (Web app).

For native iOS builds, you also need a `GoogleService-Info.plist` in the project root (from Firebase Console → iOS app).

### 3. Run the app

```bash
npm start          # Opens Expo dev tools — scan QR with Expo Go, or press i/a/w
npm run ios        # Run on iOS simulator
npm run android     # Run on Android emulator
npm run web         # Run in browser (dev server)
```

## Deploying the Web Build

The web app is a static export hosted on Firebase Hosting.

```bash
npx expo export -p web        # Builds the static site into dist/
firebase deploy --only hosting   # Deploys dist/ to Firebase Hosting
```

After deploying, changes go live immediately at **https://studentwellnessapp-bf2e1.web.app**.

Requires the [Firebase CLI](https://firebase.google.com/docs/cli) installed and logged in (`firebase login`) with access to the `studentwellnessapp-bf2e1` project.

## Completed Features

- Landing screen, Sign In, Create Account (KSU email)
- Home — mood check-in, daily insight/inspiration, "want to reflect" prompts, resources
- Journal — new entry (rich text, native + web), templates, past entries, PIN-lock passcode
- Wellness — mood calendar, relaxing techniques, wellbeing topics
- OwlLife (Campus) — event list/filter, campus map, keyboard-safe search
- Settings — profile (name + photo upload), notifications (mood/quote reminders), customization (background theme, quotes, templates), passcode, counselor contact
- Theme context — background theme, custom quotes/templates, profile image persisted via AsyncStorage
- Cross-platform (native + web) fixes for Alert dialogs, icon fonts, and the journal rich text editor

## Pending / Known Gaps

- Onboarding flow (Log Mood → Write Feelings → Find Campus Events, 3 screens)
- Wellbeing Toolkit expanded/modal view
- Dark mode functionality
- Search functionality (beyond OwlLife event filter)
- Firebase Auth persistence fix
- `dashboard/` — admin dashboard is scaffolded but not yet built out
