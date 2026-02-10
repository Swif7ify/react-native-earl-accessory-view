/**
 * react-native-earl-accessory-view — Showcase
 *
 * Drop this file into any React Native project that has
 * `react-native-earl-accessory-view` installed.
 *
 * @author ORDOVEZ, E,R
 */

import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	ScrollView,
	StyleSheet,
	Platform,
	SafeAreaView,
	StatusBar,
} from "react-native";
import {
	AccessoryView,
	ACCESSORY_VIEW_NATIVE_ID,
} from "react-native-earl-accessory-view";

// ─────────────────────────────────────────────────────────────────
// Showcase Screen
// ─────────────────────────────────────────────────────────────────

type ActiveField = {
	id: string;
	value: string;
	setter: (v: string) => void;
	ref: React.RefObject<TextInput>;
};

export default function Showcase() {
	// Input values
	const [basicText, setBasicText] = useState("");
	const [rightText, setRightText] = useState("");
	const [noDismissText, setNoDismissText] = useState("");
	const [counterText, setCounterText] = useState("");
	const [labelText, setLabelText] = useState("");
	const [darkText, setDarkText] = useState("");
	const [customText, setCustomText] = useState("");

	// Input refs (needed so the preview bar can re-focus the field)
	const basicRef = useRef<TextInput>(null);
	const rightRef = useRef<TextInput>(null);
	const noDismissRef = useRef<TextInput>(null);
	const counterRef = useRef<TextInput>(null);
	const labelRef = useRef<TextInput>(null);
	const darkRef = useRef<TextInput>(null);
	const customRef = useRef<TextInput>(null);

	// Which field is focused — updates instantly on focus change
	const [active, setActive] = useState<ActiveField | null>(null);

	// Helper to build focus handler
	const focusField = (
		id: string,
		value: string,
		setter: (v: string) => void,
		ref: React.RefObject<TextInput>,
	) => {
		setActive({ id, value, setter, ref });
	};

	// Keep active value in sync as the user types
	const updateValue = (
		id: string,
		newValue: string,
		setter: (v: string) => void,
	) => {
		setter(newValue);
		if (active?.id === id) {
			setActive((prev) => (prev ? { ...prev, value: newValue } : null));
		}
	};

	return (
		<SafeAreaView style={s.safe}>
			<StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

			<ScrollView
				style={s.scroll}
				contentContainerStyle={s.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				{/* Header */}
				<View style={s.header}>
					<Text style={s.title}>AccessoryView</Text>
					<Text style={s.subtitle}>
						Live input preview above the keyboard
					</Text>
				</View>

				{/* Demo 1: Basic */}
				<Section title="Basic preview">
					<TextInput
						ref={basicRef}
						style={s.input}
						placeholder="Type something here..."
						placeholderTextColor="#AAAAAA"
						value={basicText}
						onChangeText={(t) =>
							updateValue("basic", t, setBasicText)
						}
						onFocus={() =>
							focusField(
								"basic",
								basicText,
								setBasicText,
								basicRef,
							)
						}
						{...(Platform.OS === "ios" && {
							inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID,
						})}
					/>
				</Section>

				{/* Demo 2: Right-aligned */}
				<Section title="Right-aligned preview">
					<TextInput
						ref={rightRef}
						style={s.input}
						placeholder="Text previews on the right..."
						placeholderTextColor="#AAAAAA"
						value={rightText}
						onChangeText={(t) =>
							updateValue("right", t, setRightText)
						}
						onFocus={() =>
							focusField(
								"right",
								rightText,
								setRightText,
								rightRef,
							)
						}
						{...(Platform.OS === "ios" && {
							inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID,
						})}
					/>
				</Section>

				{/* Demo 3: No dismiss button */}
				<Section title="No dismiss button">
					<TextInput
						ref={noDismissRef}
						style={s.input}
						placeholder="No X button on this one..."
						placeholderTextColor="#AAAAAA"
						value={noDismissText}
						onChangeText={(t) =>
							updateValue("no-dismiss", t, setNoDismissText)
						}
						onFocus={() =>
							focusField(
								"no-dismiss",
								noDismissText,
								setNoDismissText,
								noDismissRef,
							)
						}
						{...(Platform.OS === "ios" && {
							inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID,
						})}
					/>
				</Section>

				{/* Demo 4: Character counter */}
				<Section title="Character counter (140 max)">
					<TextInput
						ref={counterRef}
						style={s.input}
						placeholder="140 character limit..."
						placeholderTextColor="#AAAAAA"
						value={counterText}
						onChangeText={(t) =>
							updateValue("counter", t, setCounterText)
						}
						onFocus={() =>
							focusField(
								"counter",
								counterText,
								setCounterText,
								counterRef,
							)
						}
						{...(Platform.OS === "ios" && {
							inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID,
						})}
					/>
				</Section>

				{/* Demo 5: With field label */}
				<Section title="With field label">
					<TextInput
						ref={labelRef}
						style={s.input}
						placeholder="Your email address..."
						placeholderTextColor="#AAAAAA"
						value={labelText}
						onChangeText={(t) =>
							updateValue("label", t, setLabelText)
						}
						onFocus={() =>
							focusField(
								"label",
								labelText,
								setLabelText,
								labelRef,
							)
						}
						keyboardType="email-address"
						{...(Platform.OS === "ios" && {
							inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID,
						})}
					/>
				</Section>

				{/* Demo 6: Dark theme */}
				<Section title="Dark theme">
					<TextInput
						ref={darkRef}
						style={s.input}
						placeholder="Dark-themed preview..."
						placeholderTextColor="#AAAAAA"
						value={darkText}
						onChangeText={(t) =>
							updateValue("dark", t, setDarkText)
						}
						onFocus={() =>
							focusField("dark", darkText, setDarkText, darkRef)
						}
						{...(Platform.OS === "ios" && {
							inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID,
						})}
					/>
				</Section>

				{/* Demo 7: Custom children */}
				<Section title="Custom children layout">
					<TextInput
						ref={customRef}
						style={s.input}
						placeholder="Custom layout above keyboard..."
						placeholderTextColor="#AAAAAA"
						value={customText}
						onChangeText={(t) =>
							updateValue("custom", t, setCustomText)
						}
						onFocus={() =>
							focusField(
								"custom",
								customText,
								setCustomText,
								customRef,
							)
						}
						{...(Platform.OS === "ios" && {
							inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID,
						})}
					/>
				</Section>

				<View style={{ height: 200 }} />
			</ScrollView>

			{/* ── Accessory Views ──────────────────────────────────── */}

			{active?.id === "basic" && (
				<AccessoryView
					value={active.value}
					onValueChange={(t) => updateValue("basic", t, setBasicText)}
					onPress={() => basicRef.current?.focus()}
					placeholder="Start typing..."
				/>
			)}

			{active?.id === "right" && (
				<AccessoryView
					value={active.value}
					onValueChange={(t) => updateValue("right", t, setRightText)}
					onPress={() => rightRef.current?.focus()}
					textPosition="right"
					placeholder="Waiting for input..."
				/>
			)}

			{active?.id === "no-dismiss" && (
				<AccessoryView
					value={active.value}
					onValueChange={(t) =>
						updateValue("no-dismiss", t, setNoDismissText)
					}
					onPress={() => noDismissRef.current?.focus()}
					showDismissButton={false}
					placeholder="No close button"
				/>
			)}

			{active?.id === "counter" && (
				<AccessoryView
					value={active.value}
					onValueChange={(t) =>
						updateValue("counter", t, setCounterText)
					}
					onPress={() => counterRef.current?.focus()}
					charCount={counterText.length}
					maxCharCount={140}
					charCountWarningThreshold={0.8}
					placeholder="Start typing..."
				/>
			)}

			{active?.id === "label" && (
				<AccessoryView
					value={active.value}
					onValueChange={(t) => updateValue("label", t, setLabelText)}
					onPress={() => labelRef.current?.focus()}
					label="Email"
					placeholder="Enter email..."
				/>
			)}

			{active?.id === "dark" && (
				<AccessoryView
					value={active.value}
					onValueChange={(t) => updateValue("dark", t, setDarkText)}
					onPress={() => darkRef.current?.focus()}
					placeholder="Type here..."
					backgroundColor="#1A1A2E"
					valueStyle={{ color: "#FFFFFF" }}
					placeholderStyle={{ color: "#555577" }}
					dismissButtonTextStyle={{ color: "#888899" }}
					borderTopColor="#2A2A44"
					elevation={8}
				/>
			)}

			{active?.id === "custom" && (
				<AccessoryView backgroundColor="#FFFFFF" height={50}>
					<View style={s.customRow}>
						<View style={s.customPreview}>
							<Text style={s.customLabel}>Preview</Text>
							<Text style={s.customValue} numberOfLines={1}>
								{customText || "Nothing yet..."}
							</Text>
						</View>
						<Text style={s.customCount}>{customText.length}</Text>
					</View>
				</AccessoryView>
			)}
		</SafeAreaView>
	);
}

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<View style={s.section}>
			<Text style={s.sectionTitle}>{title}</Text>
			{children}
		</View>
	);
}

// ─────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: "#FAFAFA",
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 16,
	},

	header: {
		marginBottom: 24,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#111111",
		letterSpacing: -0.5,
	},
	subtitle: {
		fontSize: 15,
		color: "#777777",
		marginTop: 4,
	},

	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: "#444444",
		marginBottom: 8,
	},

	input: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#E5E5E5",
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 15,
		color: "#111111",
	},

	customRow: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		paddingHorizontal: 16,
	},
	customPreview: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	customLabel: {
		fontSize: 11,
		fontWeight: "700",
		color: "#AAAAAA",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	customValue: {
		flex: 1,
		fontSize: 15,
		color: "#333333",
	},
	customCount: {
		fontSize: 13,
		color: "#BBBBBB",
		fontWeight: "500",
		marginLeft: 12,
	},
});
