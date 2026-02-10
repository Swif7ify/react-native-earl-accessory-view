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
    - Dismiss button with auto-positioning, customizable with any icon library
    - Option to hide the dismiss button
    - Character counter with warning/error color thresholds
    - Custom children for full layout control
    - Animated show/hide synced with keyboard
    - `alwaysVisible` mode for sticky footer behavior

- **`<DismissButton />`** — Standalone dismiss button component
    - Accepts custom content (icons from lucide, ionicons, etc.)
    - Fully styleable with press feedback
    - Defaults to `Keyboard.dismiss()`

- **`<CharacterCounter />`** — Character count display
    - Warning and error color thresholds
    - Configurable position and custom format function

- **`useKeyboardAccessory` hook** — Keyboard state management
    - Cross-platform: iOS `keyboardWillShow/Hide`, Android `keyboardDidShow/Hide`
    - Returns `keyboardVisible`, `keyboardHeight`, `animatedValue`

- **Cross-platform support** — iOS, Android, Web
- **Full TypeScript support** with JSDoc documentation
- **Showcase** — Ready-to-use demo screen (`showcase.tsx`)

---

**Author:** ORDOVEZ, E,R
