# react-native-earl-accessory-view

[![npm version](https://img.shields.io/npm/v/react-native-earl-accessory-view.svg)](https://www.npmjs.com/package/react-native-earl-accessory-view)
[![license](https://img.shields.io/npm/l/react-native-earl-accessory-view.svg)](https://github.com/ordovez-er/react-native-earl-accessory-view/blob/main/LICENSE)
[![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue.svg)]()

A **keyboard input preview bar** for React Native. When the keyboard covers your input field, this bar sits above the keyboard showing what the user is typing in real-time — so they never lose sight of their input.

Fully customizable with **action buttons**, smooth animations, and cross-platform support on **iOS**, **Android**, and **Web**.

---

## The Problem

On mobile, the soft keyboard frequently covers `TextInput` fields — especially inputs near the bottom of the screen. Users end up typing blind, unsure what they've entered.

## The Solution

`react-native-earl-accessory-view` adds a slim bar above the keyboard that **mirrors what the user is typing** in real-time. When the keyboard goes away, the bar animates out smoothly.

---

## Features

- **Live input preview** — shows the current value above the keyboard in real-time
- **Action buttons** — add send, attach, navigate, or any custom buttons with icons
- **Fully customizable** — colors, fonts, height, borders, shadows, padding — everything
- **Smooth animations** — fade + slide transitions synced with keyboard events
- **Text positioning** — place preview text on the left or right
- **Dismiss button** — auto-positions opposite to the text, fully styleable, or hide it
- **Field label** — optional label like "Email" or "Password" next to the preview
- **Character counter** — built-in with warning/error color thresholds
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
			<AccessoryView value={text} onValueChange={setText} />
		</View>
	);
}
```

---

## Usage Examples

### Basic Preview

```tsx
const [text, setText] = useState("");

<TextInput value={text} onChangeText={setText} />
<AccessoryView value={text} onValueChange={setText} />
```

### Send Button

Replace the dismiss button with a send action:

```tsx
<AccessoryView
	value={text}
	onValueChange={setText}
	actionButtons={[
		{
			id: "send",
			content: "Send",
			onPress: () => {
				console.log("Sending:", text);
				setText("");
			},
			disabled: !text.trim(),
			position: "right",
		},
	]}
/>
```

### Send with Custom Icon

Use any icon library (lucide-react-native, @expo/vector-icons, etc.):

```tsx
import { Send } from "lucide-react-native";

<AccessoryView
	value={text}
	onValueChange={setText}
	actionButtons={[
		{
			id: "send",
			content: <Send size={20} color="#007AFF" />,
			onPress: handleSend,
			disabled: !text.trim(),
		},
	]}
/>;
```

### Switch Between Inputs (Prev / Next)

Navigate between form fields with any icon library:

```tsx
import { ChevronLeft, ChevronRight } from "lucide-react-native";

<AccessoryView
	value={currentValue}
	onValueChange={setCurrentValue}
	label={currentField === "email" ? "Email" : "Password"}
	actionButtons={[
		{
			id: "prev",
			content: <ChevronLeft size={20} color="#6366F1" />,
			onPress: () => emailRef.current?.focus(),
			disabled: currentField === "email",
			position: "left",
		},
		{
			id: "next",
			content: <ChevronRight size={20} color="#6366F1" />,
			onPress: () => passwordRef.current?.focus(),
			disabled: currentField === "password",
			position: "right",
		},
	]}
	showDismissButton={true}
/>;
```

### Multi-Action Bar (Attach + Camera + Send)

Combine multiple actions — `content` accepts **any ReactNode** and `onPress` accepts **any function**:

```tsx
import { Paperclip, Camera, Send } from "lucide-react-native";

<AccessoryView
	value={text}
	onValueChange={setText}
	actionButtons={[
		{
			id: "attach",
			content: <Paperclip size={20} color="#6B7280" />,
			onPress: openFilePicker,
			position: "left",
		},
		{
			id: "camera",
			content: <Camera size={20} color="#6B7280" />,
			onPress: openCamera,
			position: "left",
		},
		{
			id: "send",
			content: <Send size={20} color="#007AFF" />,
			onPress: handleSend,
			disabled: !text.trim(),
			position: "right",
		},
	]}
/>;
```

### Right-Aligned Text

```tsx
<AccessoryView
	value={text}
	onValueChange={setText}
	textPosition="right"
	placeholder="Waiting for input..."
/>
```

### No Dismiss Button

```tsx
<AccessoryView value={text} onValueChange={setText} showDismissButton={false} />
```

### With a Field Label

```tsx
<AccessoryView value={text} onValueChange={setText} label="Email" />
```

### Character Counter

```tsx
<AccessoryView
	value={text}
	onValueChange={setText}
	charCount={text.length}
	maxCharCount={280}
	charCountWarningThreshold={0.8}
/>
```

### Custom Dismiss Icon (any icon library)

```tsx
import { X } from "lucide-react-native";

<AccessoryView
	value={text}
	onValueChange={setText}
	dismissButtonContent={<X size={18} color="#666" />}
/>;
```

### Dark Theme

```tsx
<AccessoryView
	value={text}
	onValueChange={setText}
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

### Forward TextInput Props (autoCapitalize, keyboardType, etc.)

The accessory bar's internal `TextInput` doesn't inherit props from your original input.
Use `textInputProps` to forward any standard `TextInput` prop:

```tsx
<AccessoryView
	value={code}
	onValueChange={setCode}
	placeholder="e.g., ZAM-OL-0001"
	textInputProps={{
		autoCapitalize: "characters",
		autoCorrect: false,
		keyboardType: "default",
	}}
/>
```

This ensures behavior like `autoCapitalize: 'characters'` applies when the user types directly in the preview bar — not just in your original `TextInput`.

### iOS InputAccessoryView Connection

```tsx
import { ACCESSORY_VIEW_NATIVE_ID } from "react-native-earl-accessory-view";

<TextInput inputAccessoryViewID={ACCESSORY_VIEW_NATIVE_ID} />
<AccessoryView value={text} onValueChange={setText} />
```

---

## API Reference

### `<AccessoryView />` Props

#### Preview Content

| Prop               | Type                | Default               | Description                                                                                                           |
| ------------------ | ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `value`            | `string`            | —                     | Current input value to preview (primary prop)                                                                         |
| `placeholder`      | `string`            | `'Type something...'` | Shown when value is empty                                                                                             |
| `valueStyle`       | `TextStyle`         | —                     | Style for the preview text                                                                                            |
| `placeholderStyle` | `TextStyle`         | —                     | Style for the placeholder                                                                                             |
| `editable`         | `boolean`           | `true`                | Allow editing/pasting in the preview bar                                                                              |
| `onValueChange`    | `(value) => void`   | —                     | Called when preview value changes                                                                                     |
| `onPress`          | `() => void`        | —                     | Called when non-editable preview is tapped                                                                            |
| `label`            | `string`            | —                     | Optional label (e.g. "Email")                                                                                         |
| `labelStyle`       | `TextStyle`         | —                     | Style for the label                                                                                                   |
| `textPosition`     | `'left' \| 'right'` | `'left'`              | Preview text side                                                                                                     |
| `textStyle`        | `TextStyle`         | —                     | Style for the text                                                                                                    |
| `children`         | `ReactNode`         | —                     | Custom content (overrides default layout)                                                                             |
| `textInputProps`   | `TextInputProps`    | —                     | Additional props forwarded to the internal preview `TextInput` (e.g. `autoCapitalize`, `keyboardType`, `autoCorrect`) |

#### Action Buttons

| Prop            | Type                      | Default | Description                                                              |
| --------------- | ------------------------- | ------- | ------------------------------------------------------------------------ |
| `actionButtons` | `AccessoryActionButton[]` | —       | Array of action buttons (send, switch input, etc.). See below for shape. |

**`AccessoryActionButton` shape:**

| Field                | Type                  | Default   | Description                                                |
| -------------------- | --------------------- | --------- | ---------------------------------------------------------- |
| `id`                 | `string`              | —         | Unique key (required)                                      |
| `onPress`            | `() => void`          | —         | **Any** function — send, attach, navigate, etc. (required) |
| `content`            | `ReactNode \| string` | —         | **Any** icon, component, image, or text (required)         |
| `position`           | `'left' \| 'right'`   | `'right'` | Where to place the button                                  |
| `disabled`           | `boolean`             | `false`   | Disable the button                                         |
| `style`              | `ViewStyle`           | —         | Container style override                                   |
| `textStyle`          | `TextStyle`           | —         | Text style (when `content` is a string)                    |
| `accessibilityLabel` | `string`              | —         | Accessibility label                                        |
| `testID`             | `string`              | —         | Test ID                                                    |

> **Note:** When `actionButtons` is provided, the dismiss button is automatically hidden unless `showDismissButton` is explicitly set to `true`.

#### Dismiss Button

| Prop                     | Type                          | Default            | Description                                  |
| ------------------------ | ----------------------------- | ------------------ | -------------------------------------------- |
| `showDismissButton`      | `boolean`                     | `true` \*          | Show/hide the close button                   |
| `dismissButtonPosition`  | `'auto' \| 'left' \| 'right'` | `'auto'`           | Button position (`auto` = opposite of text)  |
| `onDismiss`              | `() => void`                  | `Keyboard.dismiss` | Dismiss callback                             |
| `dismissButtonContent`   | `ReactNode`                   | `✕` text           | Custom button content (use any icon library) |
| `dismissButtonStyle`     | `ViewStyle`                   | —                  | Button container style                       |
| `dismissButtonTextStyle` | `TextStyle`                   | —                  | Default ✕ text style                         |

\* Defaults to `false` when `actionButtons` is provided.

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

#### Behavior & Animation

| Prop                | Type      | Default | Description                   |
| ------------------- | --------- | ------- | ----------------------------- |
| `animationEnabled`  | `boolean` | `true`  | Animate transitions           |
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

### `<ActionButton />` Component

A standalone action button component you can also use independently:

```tsx
import { ActionButton } from "react-native-earl-accessory-view";

<ActionButton
	id="send"
	content="Send"
	onPress={handleSend}
	disabled={!text.trim()}
/>;
```

---

### `useKeyboardAccessory(options?)` Hook

Use this hook directly for custom keyboard-aware UIs.

```tsx
const { keyboardVisible, keyboardHeight } = useKeyboardAccessory({
	onKeyboardShow: (height) => console.log("Keyboard height:", height),
	onKeyboardHide: () => console.log("Keyboard hidden"),
});
```

---

### Constants

| Constant                   | Usage                                           |
| -------------------------- | ----------------------------------------------- |
| `ACCESSORY_VIEW_NATIVE_ID` | Pass to `TextInput.inputAccessoryViewID` on iOS |

---

## Showcase

A ready-to-use demo screen is included at [`example/showcase.tsx`](example/showcase.tsx). Drop it into your app to try every feature interactively — including send buttons, input switching, and multi-action bars.

> The showcase uses [lucide-react-native](https://lucide.dev/) for icons. Install it with:
>
> ```bash
> npm install lucide-react-native react-native-svg
> ```

---

## License

MIT © [ORDOVEZ, E,R](https://github.com/ordovez-er)

**Author:** ORDOVEZ, E,R
