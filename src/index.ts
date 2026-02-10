/**
 * react-native-earl-accessory-view
 *
 * A fully customizable React Native keyboard accessory view.
 * Works on iOS, Android, and Web.
 *
 * @author ORDOVEZ, E,R
 * @license MIT
 */

// ─── Main Component ──────────────────────────────────────────────
export { AccessoryView, ACCESSORY_VIEW_NATIVE_ID } from "./AccessoryView";

// ─── Sub-Components ──────────────────────────────────────────────
export { DismissButton } from "./DismissButton";
export { CharacterCounter } from "./CharacterCounter";

// ─── Hook ────────────────────────────────────────────────────────
export { useKeyboardAccessory } from "./useKeyboardAccessory";

// ─── Types ───────────────────────────────────────────────────────
export type {
	AccessoryViewProps,
	DismissButtonProps,
	CharacterCounterProps,
	KeyboardAccessoryState,
	UseKeyboardAccessoryOptions,
	Position,
	CharCountPosition,
	DismissButtonPosition,
	AnimationEasing,
} from "./types";

// ─── Default Export ──────────────────────────────────────────────
export { AccessoryView as default } from "./AccessoryView";
