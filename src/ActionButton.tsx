import React, { useCallback, useState } from "react";
import {
	TouchableOpacity,
	Text,
	View,
	GestureResponderEvent,
} from "react-native";
import { AccessoryActionButton } from "./types";
import { styles } from "./styles";

/**
 * A versatile action button for the keyboard accessory bar.
 *
 * Renders custom content (icons, text, or any React element) and
 * fires the provided `onPress` callback when tapped.
 *
 * Use this for send buttons, input switchers, formatting toggles,
 * attachment pickers, or any custom action.
 *
 * @example
 * ```tsx
 * <ActionButton
 *   id="send"
 *   onPress={handleSend}
 *   content={<SendIcon size={20} />}
 * />
 * ```
 */
export const ActionButton: React.FC<AccessoryActionButton> = ({
	id,
	onPress,
	content,
	position = "right",
	disabled = false,
	style,
	textStyle,
	accessibilityLabel,
	testID,
}) => {
	const [pressed, setPressed] = useState(false);

	const handlePress = useCallback(
		(_event?: GestureResponderEvent) => {
			if (!disabled) {
				onPress();
			}
		},
		[onPress, disabled],
	);

	const isString = typeof content === "string";

	return (
		<TouchableOpacity
			onPress={handlePress}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			activeOpacity={0.7}
			disabled={disabled}
			hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
			accessibilityRole="button"
			accessibilityLabel={
				accessibilityLabel || (isString ? (content as string) : id)
			}
			accessibilityState={{ disabled }}
			testID={testID || `earl-accessory-action-${id}`}
			style={[
				styles.actionButton,
				position === "left"
					? styles.actionButtonLeft
					: styles.actionButtonRight,
				pressed && styles.actionButtonPressed,
				disabled && styles.actionButtonDisabled,
				style,
			]}
		>
			{isString ? (
				<Text style={[styles.actionButtonText, textStyle]}>
					{content}
				</Text>
			) : (
				<View>{content}</View>
			)}
		</TouchableOpacity>
	);
};
