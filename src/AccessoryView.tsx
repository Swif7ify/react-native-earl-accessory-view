import React, {
	useMemo,
	useCallback,
	useRef,
	useEffect,
	useState,
} from "react";
import {
	View,
	Text,
	TextInput,
	Platform,
	Keyboard,
	InputAccessoryView,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Animated,
} from "react-native";
import { AccessoryViewProps, Position, AccessoryActionButton } from "./types";
import { useKeyboardAccessory } from "./useKeyboardAccessory";
import { DismissButton } from "./DismissButton";
import { ActionButton } from "./ActionButton";
import { CharacterCounter } from "./CharacterCounter";
import { styles } from "./styles";

// Unique nativeID for iOS InputAccessoryView
const ACCESSORY_NATIVE_ID = "earl-accessory-view-native";

/**
 * AccessoryView — a keyboard input preview bar for React Native.
 *
 * Shows a live preview of what the user is typing above the keyboard,
 * so the input is always visible even when the text field is obscured.
 * The preview is interactive — paste directly or edit the text right
 * in the bar. Changes sync back via onValueChange.
 *
 * Works on iOS, Android, and Web.
 *
 * @example
 * ```tsx
 * const [text, setText] = useState('');
 *
 * <TextInput value={text} onChangeText={setText} />
 * <AccessoryView value={text} onValueChange={setText} />
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

	// Action buttons
	actionButtons,

	// Dismiss button
	showDismissButton,
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
	alwaysVisible = false,
	safeAreaEnabled = true,

	// Animation
	animationEnabled = true,
	animationDuration = 250,

	// Callbacks
	onKeyboardShow,
	onKeyboardHide,
	onAccessoryShow,
	onAccessoryHide,

	// Accessibility
	accessibilityLabel = "Input preview bar",
	testID = "earl-accessory-view",
}) => {
	const { keyboardVisible, keyboardHeight } = useKeyboardAccessory({
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

	const shouldShow = alwaysVisible || keyboardVisible;

	// ─── Animation ───────────────────────────────────────────────
	const animValue = useRef(new Animated.Value(shouldShow ? 1 : 0)).current;
	const [mounted, setMounted] = useState(shouldShow);
	const lastKeyboardHeight = useRef(keyboardHeight);

	if (keyboardVisible && keyboardHeight > 0) {
		lastKeyboardHeight.current = keyboardHeight;
	}

	useEffect(() => {
		if (shouldShow) {
			setMounted(true);
			if (animationEnabled) {
				Animated.timing(animValue, {
					toValue: 1,
					duration: animationDuration,
					useNativeDriver: true,
				}).start();
			} else {
				animValue.setValue(1);
			}
		} else {
			if (animationEnabled) {
				Animated.timing(animValue, {
					toValue: 0,
					duration: animationDuration,
					useNativeDriver: true,
				}).start(({ finished }) => {
					if (finished) {
						setMounted(false);
						lastKeyboardHeight.current = 0;
					}
				});
			} else {
				animValue.setValue(0);
				setMounted(false);
				lastKeyboardHeight.current = 0;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldShow, animationEnabled, animationDuration]);

	const animatedBarStyle = useMemo(
		() =>
			Platform.OS === "ios"
				? { opacity: animValue }
				: {
						opacity: animValue,
						transform: [
							{
								translateY: animValue.interpolate({
									inputRange: [0, 1],
									outputRange: [height + 20, 0],
								}),
							},
						],
					},
		[animValue, height],
	);

	// Resolve whether dismiss is shown:
	// - If user explicitly sets showDismissButton, respect that
	// - If actionButtons are provided and showDismissButton is not set, hide dismiss
	// - Otherwise default to true
	const effectiveShowDismiss =
		showDismissButton !== undefined
			? showDismissButton
			: !actionButtons || actionButtons.length === 0;

	// Split action buttons by position
	const leftButtons = useMemo(
		() => (actionButtons ?? []).filter((b) => b.position === "left"),
		[actionButtons],
	);
	const rightButtons = useMemo(
		() =>
			(actionButtons ?? []).filter(
				(b) => !b.position || b.position === "right",
			),
		[actionButtons],
	);

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

	// Handle preview tap (only used in non-editable mode)
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
	if (!mounted) {
		if (Platform.OS === "ios") {
			return (
				<InputAccessoryView nativeID={ACCESSORY_NATIVE_ID}>
					<View />
				</InputAccessoryView>
			);
		}
		return null;
	}

	// ─── Content ─────────────────────────────────────────────────────
	const renderContent = () => {
		// Custom children override everything
		if (children) {
			return <View style={styles.childrenContainer}>{children}</View>;
		}

		// Default layout: action buttons (left) + label + value preview + action buttons (right) + dismiss
		return (
			<>
				{/* Left action buttons */}
				{leftButtons.map((btn) => (
					<ActionButton key={btn.id} {...btn} />
				))}

				{/* Optional label */}
				{label !== undefined && (
					<Text style={[styles.label, labelStyle]} numberOfLines={1}>
						{label}
					</Text>
				)}

				{/* Preview area */}
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

				{/* Right action buttons */}
				{rightButtons.map((btn) => (
					<ActionButton key={btn.id} {...btn} />
				))}

				<DismissButton
					visible={effectiveShowDismiss}
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

	// ─── Inner Accessory Bar ─────────────────────────────────────────
	const bottomOffset =
		Platform.OS === "android"
			? keyboardVisible
				? keyboardHeight
				: lastKeyboardHeight.current
			: 0;

	const accessoryBar = (
		<Animated.View
			style={[
				styles.outerContainer,
				Platform.OS === "android" && { bottom: bottomOffset },
				Platform.OS === "ios" && styles.iosContainer,
				animatedBarStyle,
			]}
			pointerEvents={shouldShow ? "auto" : "none"}
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
