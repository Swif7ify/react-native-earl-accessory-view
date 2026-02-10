import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { CharacterCounterProps } from "./types";
import { styles } from "./styles";

/**
 * A character counter component that displays current/max count
 * with automated color changes at warning and error thresholds.
 */
export const CharacterCounter: React.FC<CharacterCounterProps> = ({
	current,
	max,
	position = "right",
	style,
	containerStyle,
	warningThreshold = 0.9,
	warningColor = "#FF9800",
	errorColor = "#F44336",
	defaultColor = "#999999",
	formatLabel,
	testID = "earl-accessory-char-counter",
}) => {
	const ratio = max > 0 ? current / max : 0;
	const isOverLimit = current > max;
	const isWarning = ratio >= warningThreshold && !isOverLimit;

	const color = useMemo(() => {
		if (isOverLimit) return errorColor;
		if (isWarning) return warningColor;
		return defaultColor;
	}, [isOverLimit, isWarning, errorColor, warningColor, defaultColor]);

	const label = useMemo(() => {
		if (formatLabel) return formatLabel(current, max);
		return `${current} / ${max}`;
	}, [current, max, formatLabel]);

	const positionStyle = useMemo(() => {
		switch (position) {
			case "left":
				return styles.charCountContainerLeft;
			case "center":
				return styles.charCountContainerCenter;
			case "right":
			default:
				return styles.charCountContainerRight;
		}
	}, [position]);

	return (
		<View
			style={[styles.charCountContainer, positionStyle, containerStyle]}
			testID={testID}
		>
			<Text
				style={[styles.charCountText, { color }, style]}
				accessibilityLabel={`${current} of ${max} characters`}
				accessibilityRole="text"
			>
				{label}
			</Text>
		</View>
	);
};
