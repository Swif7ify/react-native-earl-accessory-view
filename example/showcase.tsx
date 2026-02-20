/**
 * react-native-earl-accessory-view — Showcase
 *
 * Drop this file into any React Native project that has
 * `react-native-earl-accessory-view` installed.
 *
 * Tap any input field to see the accessory bar above the keyboard.
 *
 * @author ORDOVEZ, E,R
 */

import React, { useState, useRef, useCallback } from "react";
import {
	View,
	Text,
	TextInput,
	ScrollView,
	StyleSheet,
	Platform,
	SafeAreaView,
	Alert,
} from "react-native";
import {
	AccessoryView,
	ACCESSORY_VIEW_NATIVE_ID,
} from "react-native-earl-accessory-view";
import type { AccessoryActionButton } from "react-native-earl-accessory-view";
import {
	Send,
	ChevronLeft,
	ChevronRight,
	Paperclip,
	Camera,
} from "lucide-react-native";

// ─────────────────────────────────────────────────────────────────

type ActiveField = {
	id: string;
	value: string;
	setter: (v: string) => void;
	ref: React.RefObject<TextInput | null>;
};

// Reusable labeled input card
function InputCard({
	label,
	description,
	accent,
	children,
}: {
	label: string;
	description?: string;
	accent: string;
	children: React.ReactNode;
}) {
	return (
		<View style={cardStyles.card}>
			<View style={[cardStyles.accentBar, { backgroundColor: accent }]} />
			<View style={cardStyles.cardBody}>
				<Text style={cardStyles.cardLabel}>{label}</Text>
				{description ? (
					<Text style={cardStyles.cardDesc}>{description}</Text>
				) : null}
				{children}
			</View>
		</View>
	);
}

// ─────────────────────────────────────────────────────────────────

export default function Showcase() {
	const [basicText, setBasicText] = useState("");
	const [rightText, setRightText] = useState("");
	const [noDismissText, setNoDismissText] = useState("");
	const [counterText, setCounterText] = useState("");
	const [labelText, setLabelText] = useState("");
	const [darkText, setDarkText] = useState("");
	const [customText, setCustomText] = useState("");
	const [sendText, setSendText] = useState("");
	const [switchTextA, setSwitchTextA] = useState("");
	const [switchTextB, setSwitchTextB] = useState("");
	const [multiText, setMultiText] = useState("");
	const [messages, setMessages] = useState<string[]>([]);

	const basicRef = useRef<TextInput>(null);
	const rightRef = useRef<TextInput>(null);
	const noDismissRef = useRef<TextInput>(null);
	const counterRef = useRef<TextInput>(null);
	const labelRef = useRef<TextInput>(null);
	const darkRef = useRef<TextInput>(null);
	const customRef = useRef<TextInput>(null);
	const sendRef = useRef<TextInput>(null);
	const switchARef = useRef<TextInput>(null);
	const switchBRef = useRef<TextInput>(null);
	const multiRef = useRef<TextInput>(null);

	const [active, setActive] = useState<ActiveField | null>(null);
	const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const focusField = (
		id: string,
		value: string,
		setter: (v: string) => void,
		ref: React.RefObject<TextInput | null>,
	) => {
		// Cancel any pending keyboard-hide clear so field switches work
		if (hideTimeout.current) {
			clearTimeout(hideTimeout.current);
			hideTimeout.current = null;
		}
		setActive({ id, value, setter, ref });
	};

	const handleKeyboardHide = useCallback(() => {
		// Delay clearing so that switching fields doesn't flash-remove the accessory
		hideTimeout.current = setTimeout(() => {
			setActive(null);
			hideTimeout.current = null;
		}, 120);
	}, []);

	// Shared iOS inputAccessoryViewID prop
	const iosAccessory =
		Platform.OS === "ios"
			? { inputAccessoryViewID: ACCESSORY_VIEW_NATIVE_ID }
			: {};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				<Text style={styles.header}>Earl Accessory View</Text>
				<Text style={styles.subTitle}>
					Tap any field below — the accessory bar appears above the
					keyboard.
				</Text>

				{/* ─── BASIC USAGE ──────────────────────────────── */}
				<Text style={styles.sectionTitle}>Basic Usage</Text>

				<InputCard
					label="Basic Preview"
					description="Default accessory bar with left-aligned text preview."
					accent="#3B82F6"
				>
					<TextInput
						ref={basicRef}
						style={styles.input}
						placeholder="Start typing here..."
						placeholderTextColor="#AAAAAA"
						value={basicText}
						onChangeText={setBasicText}
						onFocus={() =>
							focusField(
								"basic",
								basicText,
								setBasicText,
								basicRef,
							)
						}
						{...iosAccessory}
					/>
				</InputCard>

				<InputCard
					label="Right-Aligned"
					description="Preview text aligned to the right side."
					accent="#6366F1"
				>
					<TextInput
						ref={rightRef}
						style={styles.input}
						placeholder="Right-aligned preview..."
						placeholderTextColor="#AAAAAA"
						value={rightText}
						onChangeText={setRightText}
						onFocus={() =>
							focusField(
								"right",
								rightText,
								setRightText,
								rightRef,
							)
						}
						{...iosAccessory}
					/>
				</InputCard>

				<InputCard
					label="No Dismiss Button"
					description="Accessory bar without the close/dismiss button."
					accent="#8B5CF6"
				>
					<TextInput
						ref={noDismissRef}
						style={styles.input}
						placeholder="No dismiss button..."
						placeholderTextColor="#AAAAAA"
						value={noDismissText}
						onChangeText={setNoDismissText}
						onFocus={() =>
							focusField(
								"no-dismiss",
								noDismissText,
								setNoDismissText,
								noDismissRef,
							)
						}
						{...iosAccessory}
					/>
				</InputCard>

				{/* ─── FEATURES ─────────────────────────────────── */}
				<Text style={styles.sectionTitle}>Features</Text>

				<InputCard
					label="Character Counter"
					description="Shows a live character count with a 140 limit."
					accent="#F59E0B"
				>
					<TextInput
						ref={counterRef}
						style={styles.input}
						placeholder="140 character limit..."
						placeholderTextColor="#AAAAAA"
						value={counterText}
						onChangeText={setCounterText}
						onFocus={() =>
							focusField(
								"counter",
								counterText,
								setCounterText,
								counterRef,
							)
						}
						{...iosAccessory}
					/>
					{counterText.length > 0 && (
						<Text
							style={[
								styles.charHint,
								counterText.length > 140 && styles.charOver,
							]}
						>
							{counterText.length} / 140
						</Text>
					)}
				</InputCard>

				<InputCard
					label="With Field Label"
					description='Accessory bar displays a label ("Email") beside the preview.'
					accent="#10B981"
				>
					<TextInput
						ref={labelRef}
						style={styles.input}
						placeholder="your@email.com"
						placeholderTextColor="#AAAAAA"
						value={labelText}
						onChangeText={setLabelText}
						keyboardType="email-address"
						onFocus={() =>
							focusField(
								"label",
								labelText,
								setLabelText,
								labelRef,
							)
						}
						{...iosAccessory}
					/>
				</InputCard>

				{/* ─── CUSTOM STYLING ───────────────────────────── */}
				<Text style={styles.sectionTitle}>Custom Styling</Text>

				<InputCard
					label="Dark Theme"
					description="Accessory bar with dark background and custom colors."
					accent="#1E293B"
				>
					<TextInput
						ref={darkRef}
						style={styles.input}
						placeholder="Dark-themed accessory..."
						placeholderTextColor="#AAAAAA"
						value={darkText}
						onChangeText={setDarkText}
						onFocus={() =>
							focusField("dark", darkText, setDarkText, darkRef)
						}
						{...iosAccessory}
					/>
				</InputCard>

				<InputCard
					label="Custom Children"
					description="Replaces default preview with a fully custom layout."
					accent="#EC4899"
				>
					<TextInput
						ref={customRef}
						style={styles.input}
						placeholder="Custom accessory layout..."
						placeholderTextColor="#AAAAAA"
						value={customText}
						onChangeText={setCustomText}
						onFocus={() =>
							focusField(
								"custom",
								customText,
								setCustomText,
								customRef,
							)
						}
						{...iosAccessory}
					/>
				</InputCard>

				{/* ─── ACTION BUTTONS ────────────────────────────── */}
				<Text style={styles.sectionTitle}>Action Buttons</Text>

				<InputCard
					label="Send Button"
					description='Right-side "Send" action that fires on press.'
					accent="#22C55E"
				>
					<TextInput
						ref={sendRef}
						style={styles.input}
						placeholder="Type a message to send..."
						placeholderTextColor="#AAAAAA"
						value={sendText}
						onChangeText={setSendText}
						onFocus={() =>
							focusField("send", sendText, setSendText, sendRef)
						}
						{...iosAccessory}
					/>
					{messages.length > 0 && (
						<View style={styles.sentList}>
							{messages.map((m, i) => (
								<Text key={i} style={styles.sentItem}>
									✓ {m}
								</Text>
							))}
						</View>
					)}
				</InputCard>

				<InputCard
					label="Switch Input (◀ ▶)"
					description="Action buttons to navigate between Field A and Field B."
					accent="#6366F1"
				>
					<Text style={styles.fieldTag}>Field A</Text>
					<TextInput
						ref={switchARef}
						style={styles.input}
						placeholder="Field A — type here..."
						placeholderTextColor="#AAAAAA"
						value={switchTextA}
						onChangeText={setSwitchTextA}
						onFocus={() =>
							focusField(
								"switch-a",
								switchTextA,
								setSwitchTextA,
								switchARef,
							)
						}
						{...iosAccessory}
					/>
					<Text style={[styles.fieldTag, { marginTop: 10 }]}>
						Field B
					</Text>
					<TextInput
						ref={switchBRef}
						style={styles.input}
						placeholder="Field B — type here..."
						placeholderTextColor="#AAAAAA"
						value={switchTextB}
						onChangeText={setSwitchTextB}
						onFocus={() =>
							focusField(
								"switch-b",
								switchTextB,
								setSwitchTextB,
								switchBRef,
							)
						}
						{...iosAccessory}
					/>
				</InputCard>

				<InputCard
					label="Multi-Action Bar"
					description="Multiple actions: Attach, Camera, Send."
					accent="#F97316"
				>
					<TextInput
						ref={multiRef}
						style={styles.input}
						placeholder="Multi-action demo..."
						placeholderTextColor="#AAAAAA"
						value={multiText}
						onChangeText={setMultiText}
						onFocus={() =>
							focusField(
								"multi",
								multiText,
								setMultiText,
								multiRef,
							)
						}
						{...iosAccessory}
					/>
				</InputCard>

				<View style={{ height: 80 }} />
			</ScrollView>

			{/* ─── ACCESSORY VIEWS ─────────────────────────────── */}

			{active?.id === "basic" && (
				<AccessoryView
					value={basicText}
					onValueChange={setBasicText}
					onKeyboardHide={handleKeyboardHide}
					placeholder="Start typing..."
				/>
			)}

			{active?.id === "right" && (
				<AccessoryView
					value={rightText}
					onValueChange={setRightText}
					onKeyboardHide={handleKeyboardHide}
					textPosition="right"
					placeholder="Waiting for input..."
				/>
			)}

			{active?.id === "no-dismiss" && (
				<AccessoryView
					value={noDismissText}
					onValueChange={setNoDismissText}
					onKeyboardHide={handleKeyboardHide}
					showDismissButton={false}
					placeholder="No close button"
				/>
			)}

			{active?.id === "counter" && (
				<AccessoryView
					value={counterText}
					onValueChange={setCounterText}
					onKeyboardHide={handleKeyboardHide}
					charCount={counterText.length}
					maxCharCount={140}
					charCountWarningThreshold={0.8}
					placeholder="Start typing..."
				/>
			)}

			{active?.id === "label" && (
				<AccessoryView
					value={labelText}
					onValueChange={setLabelText}
					onKeyboardHide={handleKeyboardHide}
					label="Email"
					placeholder="Enter email..."
				/>
			)}

			{active?.id === "dark" && (
				<AccessoryView
					value={darkText}
					onValueChange={setDarkText}
					onKeyboardHide={handleKeyboardHide}
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
				<AccessoryView
					backgroundColor="#FFFFFF"
					height={50}
					onKeyboardHide={handleKeyboardHide}
				>
					<View style={styles.customRow}>
						<View style={styles.customPreview}>
							<Text style={styles.customLabel}>Preview</Text>
							<Text style={styles.customValue} numberOfLines={1}>
								{customText || "Nothing yet..."}
							</Text>
						</View>
						<Text style={styles.customCount}>
							{customText.length}
						</Text>
					</View>
				</AccessoryView>
			)}

			{/* ─── SEND BUTTON ──────────────────────────────── */}
			{active?.id === "send" && (
				<AccessoryView
					value={sendText}
					onValueChange={setSendText}
					onKeyboardHide={handleKeyboardHide}
					placeholder="Type a message..."
					actionButtons={[
						{
							id: "send",
							content: (
								<Send
									size={20}
									color={
										sendText.trim() ? "#007AFF" : "#C7C7CC"
									}
								/>
							),
							onPress: () => {
								if (sendText.trim()) {
									setMessages((prev) => [...prev, sendText]);
									setSendText("");
									Alert.alert(
										"Sent!",
										`Message: "${sendText}"`,
									);
								}
							},
							disabled: !sendText.trim(),
							position: "right",
						},
					]}
				/>
			)}

			{/* ─── SWITCH INPUT (prev / next) ─────────────── */}
			{(active?.id === "switch-a" || active?.id === "switch-b") && (
				<AccessoryView
					value={active.id === "switch-a" ? switchTextA : switchTextB}
					onValueChange={
						active.id === "switch-a"
							? setSwitchTextA
							: setSwitchTextB
					}
					onKeyboardHide={handleKeyboardHide}
					label={active.id === "switch-a" ? "A" : "B"}
					placeholder={
						active.id === "switch-a" ? "Field A..." : "Field B..."
					}
					actionButtons={[
						{
							id: "prev",
							content: (
								<ChevronLeft
									size={20}
									color={
										active.id === "switch-a"
											? "#C7C7CC"
											: "#6366F1"
									}
								/>
							),
							onPress: () => {
								switchARef.current?.focus();
								focusField(
									"switch-a",
									switchTextA,
									setSwitchTextA,
									switchARef,
								);
							},
							disabled: active.id === "switch-a",
							position: "left",
						},
						{
							id: "next",
							content: (
								<ChevronRight
									size={20}
									color={
										active.id === "switch-b"
											? "#C7C7CC"
											: "#6366F1"
									}
								/>
							),
							onPress: () => {
								switchBRef.current?.focus();
								focusField(
									"switch-b",
									switchTextB,
									setSwitchTextB,
									switchBRef,
								);
							},
							disabled: active.id === "switch-b",
							position: "right",
						},
					]}
					showDismissButton={true}
				/>
			)}

			{/* ─── MULTI-ACTION BAR ────────────────────────── */}
			{active?.id === "multi" && (
				<AccessoryView
					value={multiText}
					onValueChange={setMultiText}
					onKeyboardHide={handleKeyboardHide}
					placeholder="Multi-action..."
					actionButtons={[
						{
							id: "attach",
							content: <Paperclip size={20} color="#6B7280" />,
							onPress: () =>
								Alert.alert("Attach", "Open file picker"),
							position: "left",
							accessibilityLabel: "Attach file",
						},
						{
							id: "camera",
							content: <Camera size={20} color="#6B7280" />,
							onPress: () => Alert.alert("Camera", "Open camera"),
							position: "left",
							accessibilityLabel: "Take photo",
						},
						{
							id: "send",
							content: (
								<Send
									size={20}
									color={
										multiText.trim() ? "#007AFF" : "#C7C7CC"
									}
								/>
							),
							onPress: () => {
								if (multiText.trim()) {
									Alert.alert("Sent!", multiText);
									setMultiText("");
								}
							},
							disabled: !multiText.trim(),
							position: "right",
							accessibilityLabel: "Send message",
						},
					]}
				/>
			)}
		</SafeAreaView>
	);
}

// ─────────────────────────────────────────────────────────────────

const cardStyles = StyleSheet.create({
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		marginBottom: 12,
		flexDirection: "row",
		overflow: "hidden",
		// shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},
	accentBar: {
		width: 4,
	},
	cardBody: {
		flex: 1,
		padding: 14,
	},
	cardLabel: {
		fontSize: 15,
		fontWeight: "700",
		color: "#111827",
		marginBottom: 2,
	},
	cardDesc: {
		fontSize: 12,
		color: "#6B7280",
		marginBottom: 10,
		lineHeight: 17,
	},
});

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#F9FAFB" },
	scrollContent: { padding: 20, paddingBottom: 20 },
	header: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 5,
		marginTop: 40,
	},
	subTitle: {
		fontSize: 14,
		fontWeight: "400",
		marginTop: 4,
		marginBottom: 12,
		color: "#6B7280",
		textAlign: "center",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginTop: 24,
		marginBottom: 12,
		color: "#374151",
	},
	input: {
		backgroundColor: "#F9FAFB",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 15,
		color: "#111111",
	},
	charHint: {
		fontSize: 11,
		color: "#9CA3AF",
		marginTop: 4,
		textAlign: "right",
	},
	charOver: {
		color: "#EF4444",
		fontWeight: "600",
	},
	fieldTag: {
		fontSize: 11,
		fontWeight: "600",
		color: "#6366F1",
		textTransform: "uppercase",
		letterSpacing: 0.5,
		marginBottom: 4,
	},
	sentList: {
		marginTop: 8,
		gap: 2,
	},
	sentItem: {
		fontSize: 12,
		color: "#22C55E",
	},

	// Custom children
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
