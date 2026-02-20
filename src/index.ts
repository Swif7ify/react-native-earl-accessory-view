/**
 * react-native-earl-accessory-view
 *
 * A keyboard input preview bar for React Native.
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
export { ActionButton } from "./ActionButton";

// ─── Hook ────────────────────────────────────────────────────────
export { useKeyboardAccessory } from "./useKeyboardAccessory";

// ─── Types ───────────────────────────────────────────────────────
export type {
	AccessoryViewProps,
	AccessoryActionButton,
	DismissButtonProps,
	CharacterCounterProps,
	KeyboardAccessoryState,
	UseKeyboardAccessoryOptions,
	Position,
	CharCountPosition,
	DismissButtonPosition,
} from "./types";

// ─── Default Export ──────────────────────────────────────────────
export { AccessoryView as default } from "./AccessoryView";
