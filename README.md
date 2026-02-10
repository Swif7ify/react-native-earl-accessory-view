# react-native-earl-accessory-view

[![npm version](https://img.shields.io/npm/v/react-native-earl-accessory-view.svg)](https://www.npmjs.com/package/react-native-earl-accessory-view)
[![license](https://img.shields.io/npm/l/react-native-earl-accessory-view.svg)](https://github.com/ordovez-er/react-native-earl-accessory-view/blob/main/LICENSE)
[![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue.svg)]()

A **keyboard input preview bar** for React Native. When the keyboard covers your input field, this bar sits above the keyboard showing what the user is typing in real-time — so they never lose sight of their input.

Fully customizable. Works on **iOS**, **Android**, and **Web**.

---

## The Problem

On mobile, the soft keyboard frequently covers `TextInput` fields — especially inputs near the bottom of the screen. Users end up typing blind, unsure what they've entered.

## The Solution

`react-native-earl-accessory-view` adds a slim bar above the keyboard that **mirrors what the user is typing** in real-time. When the keyboard goes away, the bar disappears too.

---

## Features

- **Live input preview** — shows the current value above the keyboard in real-time
- **Fully customizable** — colors, fonts, height, borders, shadows, padding — everything
- **Text positioning** — place preview text on the left or right
- **Dismiss button** — auto-positions opposite to the text, fully styleable, supports any icon library (lucide, ionicons, etc.), or hide it entirely
- **Field label** — optional label like "Email" or "Password" next to the preview
- **Character counter** — built-in with warning/error color thresholds
- **Smooth animations** — synced with keyboard events, configurable easing
- **Cross-platform** — iOS `InputAccessoryView`, Android absolute positioning, Web fallback
- **Safe area aware** — respects bottom safe areas on notched devices
- **Custom children** — override the default layout with any React Native content
- **TypeScript first** — full type definitions with JSDoc

---

## Installation

```bash
npm install react-native-earl-accessory-view
# or
yarn add react-native-earl-accessory-view
```

> **Peer dependencies:** `react >= 16.8.0` and `react-native >= 0.60.0`

---

## Quick Start

```tsx
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { AccessoryView } from "react-native-earl-accessory-view";

export default function App() {
	const [text, setText] = useState("");

	return (
		<View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
			<TextInput
				value={text}
				onChangeText={setText}
				placeholder="Type something..."
				style={{
					borderWidth: 1,
					borderColor: "#ccc",
					padding: 12,
					borderRadius: 8,
				}}
			/>

			{/* This bar appears above the keyboard, previewing what you type */}
			<AccessoryView value={text} />
		</View>
	);
}
```

---

## Usage Examples

### Basic Preview

```tsx
const [text, setText] = useState('');

<TextInput value={text} onChangeText={setText} />
<AccessoryView value={text} />
```

### Preview on the Right, Dismiss on the Left

```tsx
<AccessoryView
	value={text}
	textPosition="right"
	placeholder="Waiting for input..."
/>
```

### No Dismiss Button

```tsx
<AccessoryView value={text} showDismissButton={false} />
```

### With a Field Label

```tsx
<AccessoryView value={text} label="Email" />
```

### Character Counter

```tsx
<AccessoryView
	value={text}
	charCount={text.length}
	maxCharCount={280}
	charCountWarningThreshold={0.8}
/>
```

### Custom Dismiss Icon (any icon library)

```tsx
// Example with lucide-react-native
import { X } from "lucide-react-native";

<AccessoryView
	value={text}
	dismissButtonContent={<X size={18} color="#666" />}
/>;
```

### Dark Theme

```tsx
<AccessoryView
	value={text}
	backgroundColor="#1A1A2E"
	valueStyle={{ color: "#FFFFFF" }}
	placeholderStyle={{ color: "#555577" }}
	dismissButtonTextStyle={{ color: "#888899" }}
	borderTopColor="#2A2A44"
/>
```

### Custom Children (Full Control)

```tsx
<AccessoryView backgroundColor="#FFFFFF" height={50}>
	<View
		style={{
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 16,
			flex: 1,
		}}
	>
		<Text style={{ color: "#aaa", fontSize: 11, fontWeight: "700" }}>
			PREVIEW
		</Text>
		<Text style={{ flex: 1, marginLeft: 8 }}>
			{text || "Nothing yet..."}
		</Text>
		<Text style={{ color: "#bbb" }}>{text.length}</Text>
	</View>
</AccessoryView>
```

### iOS InputAccessoryView Connection

```tsx
import { ACCESSORY_VIEW_NATIVE_ID } from 'react-native-earl-accessory-view';

<TextInput inputAccessoryViewID={ACCESSORY_VIEW_NATIVE_ID} />
<AccessoryView value={text} />
```

---

## API Reference

### `<AccessoryView />` Props

#### Preview Content

| Prop               | Type                | Default               | Description                                   |
| ------------------ | ------------------- | --------------------- | --------------------------------------------- |
| `value`            | `string`            | —                     | Current input value to preview (primary prop) |
| `placeholder`      | `string`            | `'Type something...'` | Shown when value is empty                     |
| `valueStyle`       | `TextStyle`         | —                     | Style for the preview text                    |
| `placeholderStyle` | `TextStyle`         | —                     | Style for the placeholder                     |
| `numberOfLines`    | `number`            | `1`                   | Max lines for the preview                     |
| `label`            | `string`            | —                     | Optional label (e.g. "Email")                 |
| `labelStyle`       | `TextStyle`         | —                     | Style for the label                           |
| `textPosition`     | `'left' \| 'right'` | `'left'`              | Preview text side                             |
| `children`         | `ReactNode`         | —                     | Custom content (overrides default layout)     |

#### Dismiss Button

| Prop                     | Type                          | Default            | Description                                  |
| ------------------------ | ----------------------------- | ------------------ | -------------------------------------------- |
| `showDismissButton`      | `boolean`                     | `true`             | Show/hide the close button                   |
| `dismissButtonPosition`  | `'auto' \| 'left' \| 'right'` | `'auto'`           | Button position (`auto` = opposite of text)  |
| `onDismiss`              | `() => void`                  | `Keyboard.dismiss` | Dismiss callback                             |
| `dismissButtonContent`   | `ReactNode`                   | `✕` text           | Custom button content (use any icon library) |
| `dismissButtonStyle`     | `ViewStyle`                   | —                  | Button container style                       |
| `dismissButtonTextStyle` | `TextStyle`                   | —                  | Default ✕ text style                         |

#### Character Counter

| Prop                        | Type                            | Default     | Description             |
| --------------------------- | ------------------------------- | ----------- | ----------------------- |
| `charCount`                 | `number`                        | —           | Current count           |
| `maxCharCount`              | `number`                        | —           | Max count               |
| `charCountPosition`         | `'left' \| 'right' \| 'center'` | `'right'`   | Counter position        |
| `charCountWarningThreshold` | `number`                        | `0.9`       | Warning threshold (0–1) |
| `charCountWarningColor`     | `string`                        | `'#FF9800'` | Warning color           |
| `charCountErrorColor`       | `string`                        | `'#F44336'` | Over-limit color        |

#### Appearance

| Prop                    | Type        | Default         | Description      |
| ----------------------- | ----------- | --------------- | ---------------- |
| `backgroundColor`       | `string`    | `'#FFFFFF'`     | Background color |
| `height`                | `number`    | `44`            | Bar height       |
| `borderTopWidth`        | `number`    | `hairlineWidth` | Top border       |
| `borderTopColor`        | `string`    | `'#E0E0E0'`     | Border color     |
| `elevation`             | `number`    | `4`             | Shadow depth     |
| `containerStyle`        | `ViewStyle` | —               | Outer style      |
| `contentContainerStyle` | `ViewStyle` | —               | Inner style      |

#### Behavior

| Prop                | Type      | Default | Description                   |
| ------------------- | --------- | ------- | ----------------------------- |
| `animated`          | `boolean` | `true`  | Animate transitions           |
| `animationDuration` | `number`  | `250`   | Duration (ms)                 |
| `alwaysVisible`     | `boolean` | `false` | Keep visible without keyboard |
| `safeAreaEnabled`   | `boolean` | `true`  | Respect safe area (iOS)       |

#### Callbacks

| Prop              | Type               | Description        |
| ----------------- | ------------------ | ------------------ |
| `onKeyboardShow`  | `(height) => void` | Keyboard appeared  |
| `onKeyboardHide`  | `() => void`       | Keyboard dismissed |
| `onAccessoryShow` | `() => void`       | Bar appeared       |
| `onAccessoryHide` | `() => void`       | Bar hidden         |

---

### `useKeyboardAccessory(options?)` Hook

Use this hook directly for custom keyboard-aware UIs.

```tsx
const { keyboardVisible, keyboardHeight, animatedValue } =
	useKeyboardAccessory();
```

---

### Constants

| Constant                   | Usage                                           |
| -------------------------- | ----------------------------------------------- |
| `ACCESSORY_VIEW_NATIVE_ID` | Pass to `TextInput.inputAccessoryViewID` on iOS |

---

## Showcase

A ready-to-use demo screen is included at [`showcase.tsx`](showcase.tsx). Drop it into your app to try every feature interactively.

---

## License

MIT © [ORDOVEZ, E,R](https://github.com/ordovez-er)

**Author:** ORDOVEZ, E,R
