import { useEffect, useRef, useState, useCallback } from "react";
import {
	Keyboard,
	Platform,
	Animated,
	Easing,
	KeyboardEvent,
} from "react-native";
import {
	UseKeyboardAccessoryOptions,
	KeyboardAccessoryState,
	AnimationEasing,
} from "./types";

/**
 * Resolves an AnimationEasing preset to a React Native Easing function.
 */
const getEasingFunction = (easing: AnimationEasing) => {
	switch (easing) {
		case "linear":
			return Easing.linear;
		case "ease-in":
			return Easing.ease;
		case "ease-out":
			return Easing.out(Easing.ease);
		case "ease-in-out":
			return Easing.inOut(Easing.ease);
		case "spring":
			return Easing.bezier(0.25, 0.1, 0.25, 1);
		default:
			return Easing.out(Easing.ease);
	}
};

/**
 * Hook that manages keyboard visibility, height, and animated transitions.
 *
 * Cross-platform:
 * - iOS: uses `keyboardWillShow` / `keyboardWillHide` for pre-animation sync.
 * - Android: uses `keyboardDidShow` / `keyboardDidHide`.
 * - Web: falls back to `resize` event via React Native's Keyboard API.
 *
 * @param options - Configuration for animation behavior and callbacks.
 * @returns Current keyboard state and an animated value for transitions.
 */
export const useKeyboardAccessory = (
	options: UseKeyboardAccessoryOptions = {},
): KeyboardAccessoryState => {
	const {
		animated = true,
		animationDuration = 250,
		animationEasing = "ease-out",
		onKeyboardShow,
		onKeyboardHide,
	} = options;

	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const animatedValue = useRef(new Animated.Value(0)).current;

	const animateIn = useCallback(
		(duration: number = animationDuration) => {
			if (animated) {
				Animated.timing(animatedValue, {
					toValue: 1,
					duration,
					easing: getEasingFunction(animationEasing),
					useNativeDriver: true,
				}).start();
			} else {
				animatedValue.setValue(1);
			}
		},
		[animated, animationDuration, animationEasing, animatedValue],
	);

	const animateOut = useCallback(
		(duration: number = animationDuration) => {
			if (animated) {
				Animated.timing(animatedValue, {
					toValue: 0,
					duration,
					easing: getEasingFunction(animationEasing),
					useNativeDriver: true,
				}).start();
			} else {
				animatedValue.setValue(0);
			}
		},
		[animated, animationDuration, animationEasing, animatedValue],
	);

	useEffect(() => {
		// Use 'will' events on iOS for smoother sync, 'did' events elsewhere
		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const handleShow = (event: KeyboardEvent) => {
			const height = event.endCoordinates.height;
			const duration =
				Platform.OS === "ios"
					? event.duration || animationDuration
					: animationDuration;

			setKeyboardVisible(true);
			setKeyboardHeight(height);
			animateIn(duration);
			onKeyboardShow?.(height);
		};

		const handleHide = (event: KeyboardEvent) => {
			const duration =
				Platform.OS === "ios"
					? event.duration || animationDuration
					: animationDuration;

			animateOut(duration);

			// Delay state update until animation ends to prevent layout flash
			setTimeout(() => {
				setKeyboardVisible(false);
				setKeyboardHeight(0);
			}, duration);

			onKeyboardHide?.();
		};

		const showSub = Keyboard.addListener(showEvent, handleShow);
		const hideSub = Keyboard.addListener(hideEvent, handleHide);

		return () => {
			showSub.remove();
			hideSub.remove();
		};
	}, [
		animationDuration,
		animateIn,
		animateOut,
		onKeyboardShow,
		onKeyboardHide,
	]);

	return {
		keyboardVisible,
		keyboardHeight,
		animatedValue,
	};
};
