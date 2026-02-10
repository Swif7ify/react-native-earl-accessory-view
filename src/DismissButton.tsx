import React, { useCallback, useState } from "react";
import {
	TouchableOpacity,
	Text,
	Keyboard,
	View,
	GestureResponderEvent,
} from "react-native";
import { DismissButtonProps } from "./types";
import { styles } from "./styles";

/**
 * A touchable dismiss button for the keyboard accessory view.
 *
 * Renders a × icon by default, or any custom children.
 * Fully accessible with proper role and label.
 */
export const DismissButton: React.FC<DismissButtonProps> = ({
	visible = true,
	onPress,
	children,
	style,
	textStyle,
	hitSlop = 10,
	accessibilityLabel = "Dismiss keyboard",
	testID = "earl-accessory-dismiss-btn",
}) => {
	const [pressed, setPressed] = useState(false);

	const handlePress = useCallback(
		(_event?: GestureResponderEvent) => {
			if (onPress) {
				onPress();
			} else {
				Keyboard.dismiss();
			}
		},
		[onPress],
	);

	if (!visible) {
		return null;
	}

	return (
		<TouchableOpacity
			onPress={handlePress}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			activeOpacity={0.7}
			hitSlop={{
				top: hitSlop,
				bottom: hitSlop,
				left: hitSlop,
				right: hitSlop,
			}}
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel}
			testID={testID}
			style={[
				styles.dismissButton,
				pressed && styles.dismissButtonPressed,
				style,
			]}
		>
			{children ? (
				<View>{children}</View>
			) : (
				<Text style={[styles.dismissButtonText, textStyle]}>✕</Text>
			)}
		</TouchableOpacity>
	);
};
