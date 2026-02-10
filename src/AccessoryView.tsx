import React, { useMemo, useCallback, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	Animated,
	Platform,
	Keyboard,
	InputAccessoryView,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	LayoutAnimation,
	UIManager,
} from "react-native";
import { AccessoryViewProps, Position } from "./types";
import { useKeyboardAccessory } from "./useKeyboardAccessory";
import { DismissButton } from "./DismissButton";
import { CharacterCounter } from "./CharacterCounter";
import { styles } from "./styles";

// Enable LayoutAnimation on Android
if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Unique nativeID for iOS InputAccessoryView
const ACCESSORY_NATIVE_ID = "earl-accessory-view-native";

/**
 * AccessoryView — a keyboard input preview bar for React Native.
 *
 * Shows a live preview of what the user is typing above the keyboard,
 * so the input is always visible even when the text field is obscured.
 * The preview is interactive — tap to focus the input, paste directly,
 * or edit the text right in the bar.
 *
 * Works on iOS, Android, and Web.
 *
 * @example
 * ```tsx
 * const [text, setText] = useState('');
 * const inputRef = useRef<TextInput>(null);
 *
 * <TextInput ref={inputRef} value={text} onChangeText={setText} />
 * <AccessoryView
 *   value={text}
 *   onValueChange={setText}
 *   onPress={() => inputRef.current?.focus()}
 * />
 * ```
 */
export const AccessoryView: React.FC<AccessoryViewProps> = ({
	// Preview content
	value,
	placeholder = "Type something...",
	valueStyle,
	placeholderStyle,
	editable = true,
	onValueChange,
	onPress,
	label,
	labelStyle,
	textPosition = "left",
	textStyle,
	children,

	// Dismiss button
	showDismissButton = true,
	dismissButtonPosition = "auto",
	onDismiss,
	dismissButtonContent,
	dismissButtonStyle,
	dismissButtonTextStyle,
	dismissButtonHitSlop = 10,

	// Character counter
	charCount,
	maxCharCount,
	charCountPosition = "right",
	charCountStyle,
	charCountContainerStyle,
	charCountWarningThreshold = 0.9,
	charCountWarningColor = "#FF9800",
	charCountErrorColor = "#F44336",
	charCountDefaultColor = "#999999",
	charCountFormatLabel,

	// Appearance
	backgroundColor = "#FFFFFF",
	containerStyle,
	contentContainerStyle,
	height = 44,
	borderTopWidth = StyleSheet.hairlineWidth,
	borderTopColor = "#E0E0E0",
	elevation = 4,

	// Behavior
	animated = true,
	animationDuration = 250,
	animationEasing = "ease-out",
	alwaysVisible = false,
	safeAreaEnabled = true,

	// Callbacks
	onKeyboardShow,
	onKeyboardHide,
	onAccessoryShow,
	onAccessoryHide,

	// Accessibility
	accessibilityLabel = "Input preview bar",
	testID = "earl-accessory-view",
}) => {
	const prevVisible = useRef(false);

	const { keyboardVisible, keyboardHeight, animatedValue } =
		useKeyboardAccessory({
			animated,
			animationDuration,
			animationEasing,
			onKeyboardShow: useCallback(
				(kbHeight: number) => {
					onKeyboardShow?.(kbHeight);
					onAccessoryShow?.();
				},
				[onKeyboardShow, onAccessoryShow],
			),
			onKeyboardHide: useCallback(() => {
				onKeyboardHide?.();
				onAccessoryHide?.();
			}, [onKeyboardHide, onAccessoryHide]),
		});

	// Determine if we should render at all
	const shouldRender = alwaysVisible || keyboardVisible;

	// Track visibility changes for smooth transitions
	if (shouldRender !== prevVisible.current) {
		prevVisible.current = shouldRender;
	}

	// Resolve dismiss button position
	const resolvedDismissPosition: Position = useMemo(() => {
		if (dismissButtonPosition === "auto") {
			return textPosition === "left" ? "right" : "left";
		}
		return dismissButtonPosition;
	}, [dismissButtonPosition, textPosition]);

	// Whether the row layout should reverse
	const isRowReversed = useMemo(() => {
		if (children) return false;
		return textPosition === "right";
	}, [textPosition, children]);

	// Handle dismiss
	const handleDismiss = useCallback(() => {
		if (onDismiss) {
			onDismiss();
		} else {
			Keyboard.dismiss();
		}
	}, [onDismiss]);

	// Handle preview text change (paste / direct edit)
	const handleTextChange = useCallback(
		(newText: string) => {
			onValueChange?.(newText);
		},
		[onValueChange],
	);

	// Handle preview tap
	const handlePress = useCallback(() => {
		onPress?.();
	}, [onPress]);

	// Shadow / elevation styles
	const shadowStyle = useMemo(() => {
		if (Platform.OS === "android") {
			return { elevation };
		}
		return {
			shadowColor: "#000000",
			shadowOffset: { width: 0, height: -2 },
			shadowOpacity: Math.min(elevation * 0.02, 0.15),
			shadowRadius: elevation,
		};
	}, [elevation]);

	// Show character counter?
	const showCharCounter =
		charCount !== undefined &&
		maxCharCount !== undefined &&
		maxCharCount > 0;

	// Is value empty?
	const hasValue = value !== undefined && value.length > 0;

	// ─── Render Nothing ──────────────────────────────────────────────
	if (!shouldRender) {
		return null;
	}

	// ─── Content ─────────────────────────────────────────────────────
	const renderContent = () => {
		// Custom children override everything
		if (children) {
			return <View style={styles.childrenContainer}>{children}</View>;
		}

		// Default layout: label + value preview (editable TextInput) + dismiss button
		return (
			<>
				{/* Optional label */}
				{label !== undefined && (
					<Text style={[styles.label, labelStyle]} numberOfLines={1}>
						{label}
					</Text>
				)}

				{/* Preview area — editable TextInput or tappable Text */}
				{editable ? (
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						keyboardShouldPersistTaps="always"
						contentContainerStyle={styles.previewScrollContent}
						style={styles.previewScroll}
					>
						<TextInput
							style={[
								styles.previewInput,
								isRowReversed && styles.textRight,
								textStyle,
								hasValue ? valueStyle : placeholderStyle,
							]}
							value={value || ""}
							placeholder={placeholder}
							placeholderTextColor="#AAAAAA"
							onChangeText={handleTextChange}
							onFocus={handlePress}
							multiline={false}
							scrollEnabled={false}
							testID={`${testID}-input`}
						/>
					</ScrollView>
				) : (
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={handlePress}
						style={styles.previewScroll}
					>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.previewScrollContent}
						>
							<Text
								style={[
									hasValue
										? styles.previewValue
										: styles.previewPlaceholder,
									isRowReversed && styles.textRight,
									textStyle,
									hasValue ? valueStyle : placeholderStyle,
								]}
							>
								{hasValue ? value : placeholder}
							</Text>
						</ScrollView>
					</TouchableOpacity>
				)}

				<DismissButton
					visible={showDismissButton}
					onPress={handleDismiss}
					style={[
						dismissButtonStyle,
						resolvedDismissPosition === "left" &&
							styles.dismissButtonLeft,
					]}
					textStyle={dismissButtonTextStyle}
					hitSlop={dismissButtonHitSlop}
				>
					{dismissButtonContent}
				</DismissButton>
			</>
		);
	};

	// ─── Character Counter ───────────────────────────────────────────
	const renderCharCounter = () => {
		if (!showCharCounter) return null;
		return (
			<CharacterCounter
				current={charCount!}
				max={maxCharCount!}
				position={charCountPosition}
				style={charCountStyle}
				containerStyle={charCountContainerStyle}
				warningThreshold={charCountWarningThreshold}
				warningColor={charCountWarningColor}
				errorColor={charCountErrorColor}
				defaultColor={charCountDefaultColor}
				formatLabel={charCountFormatLabel}
			/>
		);
	};

	// ─── Animated Wrapper ────────────────────────────────────────────
	// Only use translateY — no opacity — to avoid ghosting / artifacting
	const animatedStyle = animated
		? {
				transform: [
					{
						translateY: animatedValue.interpolate({
							inputRange: [0, 1],
							outputRange: [height + 10, 0],
							extrapolate: "clamp" as const,
						}),
					},
				],
			}
		: {};

	// ─── Inner Accessory Bar ─────────────────────────────────────────
	const accessoryBar = (
		<Animated.View
			style={[
				styles.outerContainer,
				Platform.OS === "android" && {
					bottom: keyboardVisible ? keyboardHeight : 0,
				},
				animatedStyle,
			]}
			accessibilityLabel={accessibilityLabel}
			accessibilityRole="toolbar"
			testID={testID}
		>
			<View
				style={[
					styles.container,
					{
						backgroundColor,
						borderTopWidth,
						borderTopColor,
					},
					shadowStyle,
					containerStyle,
				]}
			>
				<View
					style={[
						styles.contentContainer,
						{ minHeight: height },
						isRowReversed && styles.contentContainerReverse,
						contentContainerStyle,
					]}
				>
					{renderContent()}
				</View>

				{renderCharCounter()}
			</View>

			{/* Safe area bottom spacer for notched devices */}
			{safeAreaEnabled && Platform.OS === "ios" && (
				<View style={[styles.safeAreaSpacer, { backgroundColor }]} />
			)}
		</Animated.View>
	);

	// ─── iOS InputAccessoryView Wrapper ──────────────────────────────
	if (Platform.OS === "ios") {
		return (
			<InputAccessoryView nativeID={ACCESSORY_NATIVE_ID}>
				{accessoryBar}
			</InputAccessoryView>
		);
	}

	// ─── Android / Web / Other ───────────────────────────────────────
	return accessoryBar;
};

/**
 * The nativeID to use on iOS TextInput for connecting to this accessory view.
 *
 * @example
 * ```tsx
 * import { ACCESSORY_VIEW_NATIVE_ID } from 'react-native-earl-accessory-view';
 * <TextInput inputAccessoryViewID={ACCESSORY_VIEW_NATIVE_ID} />
 * ```
 */
export { ACCESSORY_NATIVE_ID as ACCESSORY_VIEW_NATIVE_ID };
