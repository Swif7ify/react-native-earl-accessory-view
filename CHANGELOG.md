# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-02-10

### Initial Release

#### Added

- **`<AccessoryView />`** — Keyboard input preview bar
    - Live preview of the current input value above the keyboard
    - Placeholder text when the input is empty
    - Optional field label (e.g. "Email", "Password")
    - Text positioning (left/right)
    - Smooth fade + slide animations synced with keyboard events (`animationEnabled`, `animationDuration`)
    - `alwaysVisible` mode for sticky footer behavior

- **`actionButtons` prop** — Array of fully customizable action buttons
    - `content` accepts **any ReactNode**: icons from any library (lucide-react-native, @expo/vector-icons, etc.), images, custom components, or plain strings
    - `onPress` accepts **any function**: send messages, switch inputs, open pickers, navigate, toggle formatting — anything
    - `position` ('left' or 'right') to place buttons on either side of the preview
    - `disabled` state with visual feedback
    - When `actionButtons` is provided, the dismiss button hides automatically (override with `showDismissButton={true}`)

- **`<ActionButton />` component** — Standalone action button, also exported for independent use

- **`<DismissButton />`** — Standalone dismiss button component
    - Accepts custom content (icons from any icon library)
    - Fully styleable with press feedback
    - Defaults to `Keyboard.dismiss()`

- **`<CharacterCounter />`** — Character count display
    - Warning and error color thresholds
    - Configurable position and custom format function

- **`useKeyboardAccessory` hook** — Keyboard state management
    - Cross-platform: iOS `keyboardWillShow/Hide`, Android `keyboardDidShow/Hide`
    - Global keyboard tracking for seamless field switching
    - Returns `keyboardVisible`, `keyboardHeight`

- **Custom children** — Override the default layout with any React Native content
- **Cross-platform support** — iOS (`InputAccessoryView`), Android (absolute positioning), Web
- **Safe area aware** — Respects bottom safe areas on notched devices
- **Full TypeScript support** with JSDoc documentation
- **`AccessoryActionButton` type** — Exported for type-safe action button configs
- **Showcase** — Ready-to-use demo screen (`example/showcase.tsx`) with 10 interactive demos

---

**Author:** ORDOVEZ, E,R
