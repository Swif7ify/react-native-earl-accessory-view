import { useEffect, useState, useRef } from "react";
import { Keyboard, Platform, KeyboardEvent } from "react-native";
import { UseKeyboardAccessoryOptions, KeyboardAccessoryState } from "./types";

// ─── Global keyboard state tracker ─────────────────────────────────
// Tracks keyboard state at module level so that newly mounted hooks
// (e.g. when switching between inputs without closing the keyboard)
// can immediately know whether the keyboard is already visible.
let _globalKeyboardVisible = false;
let _globalKeyboardHeight = 0;
let _globalListenerCount = 0;
let _globalShowSub: { remove: () => void } | null = null;
let _globalHideSub: { remove: () => void } | null = null;

function _startGlobalTracking() {
	if (_globalListenerCount === 0) {
		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		_globalShowSub = Keyboard.addListener(showEvent, (e: KeyboardEvent) => {
			_globalKeyboardVisible = true;
			_globalKeyboardHeight = e.endCoordinates.height;
		});
		_globalHideSub = Keyboard.addListener(hideEvent, () => {
			_globalKeyboardVisible = false;
			_globalKeyboardHeight = 0;
		});
	}
	_globalListenerCount++;
}

function _stopGlobalTracking() {
	_globalListenerCount--;
	if (_globalListenerCount === 0) {
		_globalShowSub?.remove();
		_globalHideSub?.remove();
		_globalShowSub = null;
		_globalHideSub = null;
	}
}

/**
 * Hook that manages keyboard visibility and height.
 *
 * Cross-platform:
 * - iOS: uses `keyboardWillShow` / `keyboardWillHide` for pre-animation sync.
 * - Android: uses `keyboardDidShow` / `keyboardDidHide`.
 * - Web: falls back to `resize` event via React Native's Keyboard API.
 *
 * Initializes with the current global keyboard state so that mounting
 * while the keyboard is already visible works correctly (e.g. when
 * switching between input fields).
 *
 * @param options - Configuration for callbacks.
 * @returns Current keyboard state.
 */
export const useKeyboardAccessory = (
	options: UseKeyboardAccessoryOptions = {},
): KeyboardAccessoryState => {
	const { onKeyboardShow, onKeyboardHide } = options;

	// Use refs for callbacks so the effect never re-subscribes listeners
	const onShowRef = useRef(onKeyboardShow);
	const onHideRef = useRef(onKeyboardHide);
	onShowRef.current = onKeyboardShow;
	onHideRef.current = onKeyboardHide;

	const [keyboardVisible, setKeyboardVisible] = useState(
		_globalKeyboardVisible,
	);
	const [keyboardHeight, setKeyboardHeight] = useState(_globalKeyboardHeight);

	useEffect(() => {
		_startGlobalTracking();

		// Sync if keyboard was already visible when this hook mounted
		if (_globalKeyboardVisible) {
			setKeyboardVisible(true);
			setKeyboardHeight(_globalKeyboardHeight);
			onShowRef.current?.(_globalKeyboardHeight);
		}

		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const handleShow = (event: KeyboardEvent) => {
			const h = event.endCoordinates.height;
			setKeyboardVisible(true);
			setKeyboardHeight(h);
			onShowRef.current?.(h);
		};

		const handleHide = () => {
			setKeyboardVisible(false);
			setKeyboardHeight(0);
			onHideRef.current?.();
		};

		const showSub = Keyboard.addListener(showEvent, handleShow);
		const hideSub = Keyboard.addListener(hideEvent, handleHide);

		return () => {
			showSub.remove();
			hideSub.remove();
			_stopGlobalTracking();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		keyboardVisible,
		keyboardHeight,
	};
};
