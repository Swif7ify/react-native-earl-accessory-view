import { ReactNode } from "react";
import {
	TextStyle,
	ViewStyle,
	StyleProp,
	TextInputProps as RNTextInputProps,
} from "react-native";

/**
 * Position options for text and dismiss button placement.
 */
export type Position = "left" | "right";

/**
 * Position options for the character counter.
 */
export type CharCountPosition = "left" | "right" | "center";

/**
 * Dismiss button position — 'auto' places it opposite to the text.
 */
export type DismissButtonPosition = "auto" | "left" | "right";

/**
 * Configuration for a single action button in the accessory bar.
 *
 * Use action buttons to add custom functionality like sending messages,
 * switching between text inputs, toggling formatting, etc.
 */
export interface AccessoryActionButton {
	/** Unique key for this button (used as React key). */
	id: string;

	/** Callback fired when the button is pressed. */
	onPress: () => void;

	/**
	 * Content to display inside the button.
	 * Can be a string (rendered as text), or any ReactNode (icons, images, etc.).
	 */
	content: ReactNode | string;

	/** Where to place this button. Default: 'right'. */
	position?: Position;

	/** Whether the button is disabled. Default: false. */
	disabled?: boolean;

	/** Style overrides for the button container. */
	style?: StyleProp<ViewStyle>;

	/** Style for text content (only used when `content` is a string). */
	textStyle?: StyleProp<TextStyle>;

	/** Accessibility label for the button. */
	accessibilityLabel?: string;

	/** Test ID for testing frameworks. */
	testID?: string;
}

/**
 * Props for the DismissButton sub-component.
 */
export interface DismissButtonProps {
	/** Whether the dismiss button is visible. */
	visible?: boolean;

	/** Callback when dismiss is pressed. Defaults to Keyboard.dismiss. */
	onPress?: () => void;

	/** Custom content to render inside the button (replaces default ×). */
	children?: ReactNode;

	/** Style for the button container. */
	style?: StyleProp<ViewStyle>;

	/** Style for the default × text. Only used when no children are provided. */
	textStyle?: StyleProp<TextStyle>;

	/** Size of the touchable hit area. Default: 44. */
	hitSlop?: number;

	/** Accessibility label. Default: 'Dismiss keyboard'. */
	accessibilityLabel?: string;

	/** Test ID for testing frameworks. */
	testID?: string;
}

/**
 * Props for the CharacterCounter sub-component.
 */
export interface CharacterCounterProps {
	/** Current character count. */
	current: number;

	/** Maximum character limit. */
	max: number;

	/** Position of the counter. Default: 'right'. */
	position?: CharCountPosition;

	/** Style overrides for the counter text. */
	style?: StyleProp<TextStyle>;

	/** Container style overrides. */
	containerStyle?: StyleProp<ViewStyle>;

	/** Percentage threshold (0-1) at which the counter turns warning color. Default: 0.9. */
	warningThreshold?: number;

	/** Color when approaching the limit. Default: '#FF9800'. */
	warningColor?: string;

	/** Color when over the limit. Default: '#F44336'. */
	errorColor?: string;

	/** Default color. Default: '#999999'. */
	defaultColor?: string;

	/** Format function for custom display. Default: (current, max) => `${current}/${max}`. */
	formatLabel?: (current: number, max: number) => string;

	/** Test ID for testing frameworks. */
	testID?: string;
}

/**
 * Main AccessoryView component props.
 */
export interface AccessoryViewProps {
	// ─── Preview Content ──────────────────────────────────────────────

	/** The current input value to preview above the keyboard. */
	value?: string;

	/** Placeholder text shown when value is empty. Default: 'Type something...' */
	placeholder?: string;

	/** Style overrides for the preview value text. */
	valueStyle?: StyleProp<TextStyle>;

	/** Style overrides for the placeholder text. */
	placeholderStyle?: StyleProp<TextStyle>;

	/** Whether the preview text is editable (enables paste and direct editing). Default: true. */
	editable?: boolean;

	/** Called when the preview value changes (e.g. user pastes or edits in the preview). */
	onValueChange?: (newValue: string) => void;

	/** Called when the preview area is tapped. Typically used to focus the original TextInput. */
	onPress?: () => void;

	/** Optional static label (e.g. field name) displayed alongside the preview. */
	label?: string;

	/** Style overrides for the label text. */
	labelStyle?: StyleProp<TextStyle>;

	/** Position of the preview text. Default: 'left'. */
	textPosition?: Position;

	/** Style overrides for the text wrapper. */
	textStyle?: StyleProp<TextStyle>;

	/** Custom content — when provided, overrides the default preview layout entirely. */
	children?: ReactNode;

	/**
	 * Additional props forwarded to the internal preview TextInput.
	 *
	 * Use this to set props like `autoCapitalize`, `keyboardType`,
	 * `autoCorrect`, `secureTextEntry`, etc. on the accessory bar's
	 * editable input.
	 *
	 * @example
	 * ```tsx
	 * <AccessoryView
	 *   value={code}
	 *   onValueChange={setCode}
	 *   textInputProps={{ autoCapitalize: 'characters', keyboardType: 'default' }}
	 * />
	 * ```
	 */
	textInputProps?: Omit<
		RNTextInputProps,
		| "value"
		| "onChangeText"
		| "placeholder"
		| "placeholderTextColor"
		| "style"
		| "multiline"
		| "scrollEnabled"
		| "testID"
	>;

	// ─── Action Buttons ───────────────────────────────────────────────

	/**
	 * Array of action buttons to display in the accessory bar.
	 *
	 * Each button can perform any function (send, switch input, navigate, etc.)
	 * and display any icon or text. Buttons are placed according to their
	 * `position` ('left' or 'right').
	 *
	 * When `actionButtons` are provided, the dismiss button is hidden by default
	 * unless `showDismissButton` is explicitly set to `true`.
	 *
	 * @example
	 * ```tsx
	 * <AccessoryView
	 *   value={text}
	 *   actionButtons={[
	 *     { id: 'send', onPress: handleSend, content: <SendIcon /> },
	 *     { id: 'attach', onPress: handleAttach, content: '📎', position: 'left' },
	 *   ]}
	 * />
	 * ```
	 */
	actionButtons?: AccessoryActionButton[];

	// ─── Dismiss Button ────────────────────────────────────────────────

	/** Whether to show the dismiss (×) button. Default: true. */
	showDismissButton?: boolean;

	/** Position for the dismiss button. 'auto' places it opposite to textPosition. Default: 'auto'. */
	dismissButtonPosition?: DismissButtonPosition;

	/** Callback when dismiss is pressed. Defaults to Keyboard.dismiss(). */
	onDismiss?: () => void;

	/** Custom content to render as the dismiss button (replaces default ×). */
	dismissButtonContent?: ReactNode;

	/** Style for the dismiss button container. */
	dismissButtonStyle?: StyleProp<ViewStyle>;

	/** Style for the default dismiss button × text. */
	dismissButtonTextStyle?: StyleProp<TextStyle>;

	/** Hit slop for the dismiss button. Default: 44. */
	dismissButtonHitSlop?: number;

	// ─── Character Counter ─────────────────────────────────────────────

	/** Current character count. When set along with maxCharCount, the counter is displayed. */
	charCount?: number;

	/** Maximum character count. Required together with charCount to show the counter. */
	maxCharCount?: number;

	/** Position of the character counter. Default: 'right'. */
	charCountPosition?: CharCountPosition;

	/** Style overrides for the character counter text. */
	charCountStyle?: StyleProp<TextStyle>;

	/** Container style for the character counter. */
	charCountContainerStyle?: StyleProp<ViewStyle>;

	/** Threshold (0-1) at which counter turns warning color. Default: 0.9. */
	charCountWarningThreshold?: number;

	/** Color when approaching the limit. Default: '#FF9800'. */
	charCountWarningColor?: string;

	/** Color when over the limit. Default: '#F44336'. */
	charCountErrorColor?: string;

	/** Default counter color. Default: '#999999'. */
	charCountDefaultColor?: string;

	/** Custom format function for the character count label. */
	charCountFormatLabel?: (current: number, max: number) => string;

	// ─── Appearance ────────────────────────────────────────────────────

	/** Background color of the accessory bar. Default: '#FFFFFF'. */
	backgroundColor?: string;

	/** Main container style overrides. */
	containerStyle?: StyleProp<ViewStyle>;

	/** Inner content wrapper style overrides. */
	contentContainerStyle?: StyleProp<ViewStyle>;

	/** Height of the accessory bar in dp. Default: 44. */
	height?: number;

	/** Top border width. Default: StyleSheet.hairlineWidth. */
	borderTopWidth?: number;

	/** Top border color. Default: '#E0E0E0'. */
	borderTopColor?: string;

	/** Elevation for Android / shadow for iOS. Default: 4. */
	elevation?: number;

	// ─── Behavior ──────────────────────────────────────────────────────

	/** Keep the accessory visible even when the keyboard is hidden. Default: false. */
	alwaysVisible?: boolean;

	/** Respect the bottom safe area on notched devices. Default: true (iOS). */
	safeAreaEnabled?: boolean;

	// ─── Animation ──────────────────────────────────────────────────────

	/** Enable slide/fade animation when showing and hiding. Default: true. */
	animationEnabled?: boolean;

	/** Duration of the show/hide animation in milliseconds. Default: 250. */
	animationDuration?: number;

	// ─── Callbacks ─────────────────────────────────────────────────────

	/** Called when the keyboard becomes visible. */
	onKeyboardShow?: (keyboardHeight: number) => void;

	/** Called when the keyboard hides. */
	onKeyboardHide?: () => void;

	/** Called when the accessory view becomes visible. */
	onAccessoryShow?: () => void;

	/** Called when the accessory view hides. */
	onAccessoryHide?: () => void;

	// ─── Accessibility ─────────────────────────────────────────────────

	/** Accessibility label for the entire accessory bar. */
	accessibilityLabel?: string;

	/** Test ID for testing frameworks. */
	testID?: string;
}

/**
 * Return type for the useKeyboardAccessory hook.
 */
export interface KeyboardAccessoryState {
	/** Whether the keyboard is currently visible. */
	keyboardVisible: boolean;

	/** The current keyboard height in dp. */
	keyboardHeight: number;
}

/**
 * Options for the useKeyboardAccessory hook.
 */
export interface UseKeyboardAccessoryOptions {
	/** Keyboard show callback. */
	onKeyboardShow?: (keyboardHeight: number) => void;

	/** Keyboard hide callback. */
	onKeyboardHide?: () => void;
}
